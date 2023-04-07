import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SearchForm } from "../Components/SearchForm";
import Loader from "../Components/Loader";
import ReportsList from "../Components/Reports/ReportsList";
import { ReportsFirebaseContext } from "../Context/reportsFirebase/reportsFirebaseContext";
import ModalForm from "../Components/Modal/ModalForm";
import CreateReports from "../Components/Reports/CreateReports";
import ChangeReports from "../Components/Reports/ChangeReports";
import { WorkersContext } from "../Context/Notes/WorkersContext";

export const ReportTab = () => {
  const { loading, data, fetchData, removeData } = useContext(
    ReportsFirebaseContext
  );
  const [filter, setFilter] = useState({
    sortQuery: "",
    searchQuery: "",
    searchKey: "batchID",
  });
  const [isAddVisible, setAddVisible] = useState(false);
  const [isChangeVisible, setChangeVisible] = useState(false);
  const [postId, setPostId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const sortedData = useMemo(() => {
    if (filter.sortQuery) {
      return [...data].sort((a, b) =>
        a[filter.sortQuery].localeCompare(b[filter.sortQuery])
      );
    } else {
      return data;
    }
  }, [filter.sortQuery, data]);

  const searchedData = useMemo(() => {
    if (filter.searchQuery) {
      return sortedData.filter((data) =>
        data[filter.searchKey].toLowerCase().includes(filter.searchQuery)
      );
    } else {
      return sortedData;
    }
  }, [filter.searchQuery, filter.searchKey, sortedData]);

  const displayedItems = searchedData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <SearchForm
        filter={filter}
        setFilter={setFilter}
        sortOptions={[
          { value: "batchID", name: "Пошук за batchID" },
          { value: "blueprint", name: "Пошук за blueprint" },
          { value: "detailsNumber", name: "Пошук за detailsNumber" },
          // { value: "workerID", name: "Пошук за workerID" },
          { value: "workerSurname", name: "Пошук за workerSurname" },
          { value: "workerDateStamp", name: "Пошук за workerDateStamp" },
          // { value: "controllerID", name: "Пошук за controllerID" },
          { value: "controllerSurname", name: "Пошук за controllerSurname" },
          { value: "controllerDateStamp", name: "Пошук за controllerDateStamp" },
        ]}
      />
      <button
        className="btn btn-success mx-3"
        onClick={() => {
          setAddVisible(true);
        }}
      >
        Create Post
      </button>
      <hr />
      <ModalForm isVisible={isAddVisible} setVisible={setAddVisible}>
        <CreateReports setModalState={setAddVisible} />
      </ModalForm>
      <ModalForm isVisible={isChangeVisible} setVisible={setChangeVisible}>
        <ChangeReports isVisible={isChangeVisible} setModalState={setChangeVisible} postId={postId} />
      </ModalForm>

      <WorkersContext.Provider
        value={{
          data: displayedItems,
          removeData: removeData,
          setChangeVisible: setChangeVisible,
          setPostId: setPostId,
        }}
      >
        {loading ? <Loader /> : <ReportsList />}
      </WorkersContext.Provider>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Предыдущая страница
        </button>
        <button>{currentPage}</button>
        <button
          disabled={currentPage === Math.ceil(searchedData.length / 10)}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Следующая страница
        </button>
      </div>
    </Fragment>
  );
};
