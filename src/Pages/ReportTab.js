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
  const { loading, data, fetchData, removeData } =
    useContext(ReportsFirebaseContext);
  const [filter, setFilter] = useState({
    sortQuery: "",
    searchQuery: "",
    searchKey: "title",
  });
  const [isAddVisible, setAddVisible] = useState(false);
  const [isChangeVisible, setChangeVisible] = useState(false);
  const [postId, setPostId] = useState("");

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

  return (
    <Fragment>
      <ModalForm isVisible={isAddVisible} setVisible={setAddVisible}>
        <CreateReports setModalState={setAddVisible} />
      </ModalForm>
      <ModalForm isVisible={isChangeVisible} setVisible={setChangeVisible}>
        <ChangeReports setModalState={setChangeVisible} postId={postId} />
      </ModalForm>

      <SearchForm
        filter={filter}
        setFilter={setFilter}
        sortOptions={[
          { value: "title", name: "Пошук за title" },
          { value: "id", name: "Пошук за ID" },
          { value: "date", name: "Пошук за date" },
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
      <WorkersContext.Provider
        value={{
          data: searchedData,
          removeData: removeData,
          setChangeVisible: setChangeVisible,
          setPostId: setPostId,
        }}
      >
        {loading ? <Loader /> : <ReportsList />}
      </WorkersContext.Provider>
    </Fragment>
  );
};
