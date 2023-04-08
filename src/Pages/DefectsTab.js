import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SearchForm } from "../Components/SearchForm";
import Loader from "../Components/Loader";
import DefectsList from "../Components/Defects/DefectsList"
import { FirebaseContext } from "../Context/Firebase/defectsFirebaseContext";
import ModalForm from "../Components/Modal/ModalForm";
import CreateDefects from "../Components/Defects/CreateDefects"
import ChangeDefects from "../Components/Defects/ChangeDefects"
import { WorkersContext } from "../Context/Notes/WorkersContext";

export const DefectsTab = () => {
  const { loading, data, fetchData, removeData } = useContext(
    FirebaseContext
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
      return [...data].sort((a, b) => {
        if(typeof(a[filter.sortQuery]) == 'number' && typeof(b[filter.sortQuery]) == 'number') {
          return data.sort((a, b) => a[filter.sortQuery] - b[filter.sortQuery]);
        } else {
          return a[filter.sortQuery].localeCompare(b[filter.sortQuery])
        }
      }
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
          { value: "batchID", name: " за ID партії" },
          { value: "blueprint", name: " за кресленням" },
          { value: "operation", name: " за операцією" },
          { value: "detailsNumber", name: " за к-стю деталей" },
          { value: "defectiveDetails", name: " за бракованими деталями" },
          { value: "workerSurname", name: " за прізв. робочого" },
          { value: "controllerSurname", name: " за прізв. контролера" },
          { value: "controllerDateStamp", name: " за датою перевірки" },
          { value: "defectType", name: " за типом браку" },
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
        <CreateDefects setModalState={setAddVisible} />
      </ModalForm>
      <ModalForm isVisible={isChangeVisible} setVisible={setChangeVisible}>
        <ChangeDefects isVisible={isChangeVisible} setModalState={setChangeVisible} postId={postId} />
      </ModalForm>

      <WorkersContext.Provider
        value={{
          data: displayedItems,
          removeData: removeData,
          setChangeVisible: setChangeVisible,
          setPostId: setPostId,
        }}
      >
        {loading ? <Loader /> : <DefectsList />}
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
