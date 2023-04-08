import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SearchForm } from "../Components/SearchForm";
import Loader from "../Components/Loader";
import ControllersList from "../Components/workControllers/ControllersList";
import { FirebaseContext } from "../Context/Firebase/controllersFirebaseContext";
import ModalForm from "../Components/Modal/ModalForm";
import CreateController from "../Components/workControllers/CreateController";
import ChangeController from "../Components/workControllers/ChangeController";
import { WorkersContext } from "../Context/Notes/WorkersContext";

export const ControllerTab = () => {
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
        <CreateController setModalState={setAddVisible} />
      </ModalForm>
      <ModalForm isVisible={isChangeVisible} setVisible={setChangeVisible}>
        <ChangeController isVisible={isChangeVisible} setModalState={setChangeVisible} postId={postId} />
      </ModalForm>

      <WorkersContext.Provider
        value={{
          data: displayedItems,
          removeData: removeData,
          setChangeVisible: setChangeVisible,
          setPostId: setPostId,
        }}
      >
        {loading ? <Loader /> : <ControllersList />}
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
