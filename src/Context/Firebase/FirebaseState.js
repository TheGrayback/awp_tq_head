import React, { useReducer } from "react";
import { FirebaseContext } from "./firebaseContext";
import { FirebaseReducer } from "./firebaseReducer";
import axios from "axios";
import { ACTION_FETCH, ADD_NOTE, REMOVE_NOTE, SHOW_LOADER } from "../types";
const url =
  "https://react-study-5a117-default-rtdb.europe-west1.firebasedatabase.app/";

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchNotes = async () => {
    showLoader();
    const res = await axios.get(`${url}/notes.json`);
    const payload = Object.keys(res.data).map((key) => {
      return { ...res.data[key], id: key };
    });
    dispatch({
      type: ACTION_FETCH,
      payload,
    });
  };

  const addNote = async (title) => {
    const note = {
      title,
      date: new Date()/*.toJSON()*/,
    };
    try {
      const res = await axios.post(`${url}/notes.json`, note);
      const payload = Object.keys(res.data).map((key) => {
        return { ...res.data[key], id: key };
      });
      dispatch({ type: ADD_NOTE, payload });
      fetchNotes();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const changeNote = async (id, title) => {
    const note = {
      title,
      date: new Date()/*.toJSON()*/,
    };
    try {
      const res = await axios.patch(`${url}/notes/${id}.json`, note);
      const payload = Object.keys(res.data).map((key) => {
        return { ...res.data[key], id: key };
      });
      dispatch({ type: ADD_NOTE, payload });
      fetchNotes();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const removeNote = async (id) => {
    await axios.delete(`${url}/notes/${id}.json`);
    dispatch({
      type: REMOVE_NOTE,
      payload: id,
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        addNote,
        removeNote,
        fetchNotes,
        changeNote,
        loading: state.loading,
        notes: state.notes,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
