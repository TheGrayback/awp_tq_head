import React, { Fragment, useContext, useEffect } from "react";
import { Form } from "../Components/Form";
import Loader from "../Components/Loader";
import NoteList from "../Components/NoteList";
import { Notes } from "../Components/Notes";
import { FirebaseContext } from "../Context/Firebase/firebaseContext";

export const Home = () => {
  const { loading, notes, fetchNotes, removeNote } = useContext(FirebaseContext);

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <Form />
      <hr />
      {loading ? <Loader/> : <NoteList notes={notes} removeNote={removeNote}/>}
    </Fragment>
  );
};
