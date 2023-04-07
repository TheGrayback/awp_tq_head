import React, { useReducer } from "react";
import { FirebaseContext } from "./controllersFirebaseContext";
import { FirebaseReducer } from "./controllersFirebaseReducer";
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
const catalog = "controllers";

export const ControllersFirebaseState = ({ children }) => {
  const initialState = {
    data: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchData = async () => {
    // showLoader();
    // const res = await GetService.getStoredData(url, catalog);
    // const payload = Object.keys(res.data).map((key) => {
    //   return { ...res.data[key], id: key };
    // });
    // dispatch({
    //   type: ACTION_FETCH,
    //   payload,
    // });

    showLoader();
    const snapshot = await get(ref(databaseRef, catalog));
    const dataArray = [];
    snapshot.forEach((childSnapshot) => {
      dataArray.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });
    const payload = dataArray;
    dispatch({
      type: ACTION_FETCH,
      payload,
    });
    return payload;
  };

  const addData = async ({
    u_id,
    surname,
    name,
    patronymic,
    birthdate,
    // profession,
    post,
  }) => {
    const data = {
      u_id,
      surname,
      name,
      patronymic,
      birthdate,
      // profession,
      post,
    };
    // try {
    //   const res = await axios.post(`${url}/${catalog}.json`, data);
    //   const payload = Object.keys(res.data).map((key) => {
    //     return { ...res.data[key], id: key };
    //   });
    //   dispatch({ type: ADD_DATA, payload });
    //   fetchData();
    // } catch (e) {
    //   throw new Error(e.message);
    // }

    try {
      push(ref(databaseRef, catalog), data);
      const payload = await fetchData();
      dispatch({ type: ADD_DATA, payload });
      fetchData();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const changeData = async (
    id,
    {
      u_id,
      surname,
      name,
      patronymic,
      birthdate,
      // profession,
      post,
    }
  ) => {
    const data = {
      u_id,
      surname,
      name,
      patronymic,
      birthdate,
      // profession,
      post,
    };
    // try {
    //   const res = await axios.patch(`${url}/${catalog}/${id}.json`, data);
    //   const payload = Object.keys(res.data).map((key) => {
    //     return { ...res.data[key], id: key };
    //   });
    //   dispatch({ type: ADD_DATA, payload });
    //   fetchData();
    // } catch (e) {
    //   throw new Error(e.message);
    // }

    try {
      update(ref(databaseRef, `${catalog}/${id}`), data);
      const payload = await fetchData();
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
    <FirebaseContext.Provider
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
    </FirebaseContext.Provider>
  );
};
