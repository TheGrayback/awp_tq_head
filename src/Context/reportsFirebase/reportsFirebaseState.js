import React, { useReducer } from "react";
import { ReportsFirebaseContext } from "./reportsFirebaseContext";
import { ReportsFirebaseReducer } from "./reportsFirebaseReducer";
import axios from "axios";
import { ACTION_FETCH, ADD_DATA, REMOVE_DATA, SHOW_LOADER } from "../types";
import GetService from "../../API/GetService";
const url =
  "https://react-study-5a117-default-rtdb.europe-west1.firebasedatabase.app/";
const catalog = "reports";

export const ReportsFirebaseState = ({ children }) => {
  const initialState = {
    data: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(ReportsFirebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchData = async () => {
    showLoader();
    const res = await GetService.getStoredData(url, catalog);
    const payload = Object.keys(res.data).map((key) => {
      return { ...res.data[key], id: key };
    });
    dispatch({
      type: ACTION_FETCH,
      payload,
    });
  };

  const addData = async ({projectId, projectName, workerID}) => {
    const data = {
      projectId,
      projectName,
      workerID,
    };
    try {
      const res = await axios.post(`${url}/${catalog}.json`, data);
      const payload = Object.keys(res.data).map((key) => {
        return { ...res.data[key], id: key };
      });
      dispatch({ type: ADD_DATA, payload });
      fetchData();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const changeData = async (id, {projectId, projectName, workerID}) => {
    const data = {
      projectId,
      projectName,
      workerID,
    };
    try {
      const res = await axios.patch(`${url}/${catalog}/${id}.json`, data);
      const payload = Object.keys(res.data).map((key) => {
        return { ...res.data[key], id: key };
      });
      dispatch({ type: ADD_DATA, payload });
      fetchData();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const removeData = async (id) => {
    await axios.delete(`${url}/${catalog}/${id}.json`);
    dispatch({
      type: REMOVE_DATA,
      payload: id,
    });
  };

  return (
    <ReportsFirebaseContext.Provider
      value={{
        showLoader,
        addData: addData,
        removeData: removeData,
        fetchData: fetchData,
        changeData: changeData,
        loading: state.loading,
        data: state.data,
      }}
    >
      {children}
    </ReportsFirebaseContext.Provider>
  );
};
