import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SearchForm } from "../Components/SearchForm";
import Loader from "../Components/Loader";
import WorkersList from "../Components/WorkersList";
import { FirebaseContext } from "../Context/Firebase/FirebaseContext";
import ModalForm from "../Components/Modal/ModalForm";
import CreateWorker from "../Components/CreateWorker";
import ChangeWorker from "../Components/ChangeWorker";
import { WorkersContext } from "../Context/Notes/WorkersContext";

export const WorkerTab = () => {
  const { loading, data, fetchData, removeData } = useContext(FirebaseContext);
  const [filter, setFilter] = useState({
    sortQuery: "",
    searchQuery: "",
    searchKey: "u_id",
  });
  const [isAddVisible, setAddVisible] = useState(false);
  const [isChangeVisible, setChangeVisible] = useState(false);
  const [postId, setPostId] = useState("");
  const [pagesCount, setPagesCount] = useState("0"); //пока что не нужен
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
        data[filter.searchKey].toString().toLowerCase().includes(filter.searchQuery)
      );
    } else {
      return sortedData;
    }
  }, [filter.searchQuery, filter.searchKey, sortedData]);

  const displayedItems = searchedData.slice((currentPage - 1) * 10, currentPage * 10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      

      <SearchForm
        filter={filter}
        setFilter={setFilter}
        sortOptions={[
          { value: "u_id", name: " за робочим ID" },
          { value: "surname", name: " за прізвищем" },
          { value: "name", name: " за ім'ям" },
          { value: "patronymic", name: " по-батькові" },
          { value: "birthdate", name: " за датою народження" },
          { value: "profession", name: " за професією" },
          { value: "post", name: " за посадою" },
        ]}
      />
      <button
        className="btn btn-success mx-3"
        onClick={() => {
          setAddVisible(true);
        }}
      >
        Створити
      </button>
      <hr />
      <ModalForm isVisible={isAddVisible} setVisible={setAddVisible}>
        <CreateWorker setModalState={setAddVisible} />
      </ModalForm>
      <ModalForm isVisible={isChangeVisible} setVisible={setChangeVisible}>
        <ChangeWorker isVisible={isChangeVisible} setModalState={setChangeVisible} postId={postId} />
      </ModalForm>

      <WorkersContext.Provider
        value={{
          data: displayedItems,
          removeData: removeData,
          setChangeVisible: setChangeVisible,
          setPostId: setPostId,
        }}
      >
        {loading ? <Loader /> : <WorkersList />}
      </WorkersContext.Provider>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Попередня сторінка
        </button>
        <button>{currentPage}</button>
        <button
          disabled={currentPage === Math.ceil(searchedData.length / 10)}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Наступна сторінка
        </button>
      </div>
    </Fragment>
  );
};
