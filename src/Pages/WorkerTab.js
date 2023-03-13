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
import CreatePost from "../Components/CreateWorker";
import ChangePost from "../Components/ChangeWorker";
import { WorkersContext } from "../Context/Notes/WorkersContext";

export const WorkerTab = () => {
  const { loading, data, fetchData, removeData } =
    useContext(FirebaseContext);
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
        <CreatePost setModalState={setAddVisible} />
      </ModalForm>
      <ModalForm isVisible={isChangeVisible} setVisible={setChangeVisible}>
        <ChangePost setModalState={setChangeVisible} postId={postId} />
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
        {loading ? <Loader /> : <WorkersList />}
      </WorkersContext.Provider>
    </Fragment>
  );
};
