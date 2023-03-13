import React, { useReducer } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { FirebaseReducer } from "./FirebaseReducer";
import axios from "axios";
import { ACTION_FETCH, ADD_DATA, REMOVE_DATA, SHOW_LOADER } from "../types";
const url =
  "https://react-study-5a117-default-rtdb.europe-west1.firebasedatabase.app/";
const catalog = "workers";

export const FirebaseState = ({ children }) => {
  const initialState = {
    data: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchData = async () => {
    showLoader();
    const res = await axios.get(`${url}/${catalog}.json`);
    const payload = Object.keys(res.data).map((key) => {
      return { ...res.data[key], id: key };
    });
    dispatch({
      type: ACTION_FETCH,
      payload,
    });
  };

  const addData = async (title) => {
    const data = {
      title,
      date: new Date() /*.toJSON()*/,
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

  const changeData = async (id, title) => {
    const data = {
      title,
      date: new Date() /*.toJSON()*/,
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
