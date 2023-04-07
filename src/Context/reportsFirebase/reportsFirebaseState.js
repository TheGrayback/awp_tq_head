import React, { useContext, useReducer, useState } from "react";
import { ReportsFirebaseContext } from "./reportsFirebaseContext";
import { ReportsFirebaseReducer } from "./reportsFirebaseReducer";
import axios from "axios";
import { ACTION_FETCH, ADD_DATA, REMOVE_DATA, SHOW_LOADER } from "../types";
import GetService from "../../API/GetService";
import { databaseRef } from "../../firebase";
import {
  getDatabase,
  ref,
  get,
  onValue,
  push,
  update,
  remove,
} from "firebase/database";
const url =
  "https://react-study-5a117-default-rtdb.europe-west1.firebasedatabase.app/";
const catalog = "reports";

export const ReportsFirebaseState = ({ children }) => {
  const initialState = {
    data: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(ReportsFirebaseReducer, initialState);
  const [DBdata, setDBdata] = useState("");

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchData = async () => {
    showLoader();
    const snapshot = await get(ref(databaseRef, catalog));
    const dataArray = [];
    snapshot.forEach((childSnapshot) => {
      dataArray.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });
    // const res = await GetService.getStoredData(url, catalog);
    // const payload = Object.keys(res.data).map((key) => {
    //   return { ...res.data[key], id: key };
    // });
    const payload = dataArray;
    // console.log(payload);
    dispatch({
      type: ACTION_FETCH,
      payload,
    });
    return payload;
  };

  const addData = async ({
    batchID, //ID партии деталей
    blueprint,
    detailsNumber,
    workerID,
    workerSurname,
    workerDateStamp,
    controller,
    controllerDateStamp,
    all,
    completed,
    defects,
  }) => {
    const data = {
      batchID, //ID партии деталей
      blueprint,
      detailsNumber,
      workerID,
      workerSurname,
      workerDateStamp,
      controller,
      controllerDateStamp,
      all,
      completed,
      defects,
    };
    try {
      // const res = await axios.post(`${url}/${catalog}.json`, data);
      // databaseRef.child('reports/').push(data);
      push(ref(databaseRef, catalog), data);
      // const payload = Object.keys(res.data).map((key) => {
      //   return { ...res.data[key], id: key };
      // });
      const payload = await fetchData();
      // console.log(payload);
      dispatch({ type: ADD_DATA, payload });
      fetchData();
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  };

  const changeData = async (
    id,
    {
      batchID, //ID партии деталей
      blueprint,
      detailsNumber,
      workerID,
      workerSurname,
      workerDateStamp,
      controller,
      controllerDateStamp,
      all,
      completed,
      defects,
    }
  ) => {
    // console.log(projectID, projectName, workerID);
    const data = {
      batchID, //ID партии деталей
      blueprint,
      detailsNumber,
      workerID,
      workerSurname,
      workerDateStamp,
      controller,
      controllerDateStamp,
      all,
      completed,
      defects,
    };
    // console.log(data);
    try {
      console.log(data);
      // const res = await axios.patch(`${url}/${catalog}/${id}.json`, data);
      update(ref(databaseRef, `${catalog}/${id}`), data);
      // const payload = Object.keys(res.data).map((key) => {
      //   return { ...res.data[key], id: key };
      // });
      // console.log(catalog, id, data);
      const payload = await fetchData();
      dispatch({ type: ADD_DATA, payload });
      fetchData();
    } catch (e) {
      // console.log(catalog, id, data);
      console.log(e);
      throw new Error(e.message);
    }
  };

  const removeData = async (id) => {
    // await axios.delete(`${url}/${catalog}/${id}.json`);
    remove(ref(databaseRef, `${catalog}/${id}`));
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
