import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Form } from "../Components/Form";
import Loader from "../Components/Loader";
import NoteList from "../Components/NoteList";
import { Notes } from "../Components/Notes";
import { FirebaseContext } from "../Context/Firebase/firebaseContext";

export const Home = () => {
  const { loading, notes, fetchNotes, removeNote } = useContext(FirebaseContext);
  const [filter, setFilter] = useState({sortQuery: '', searchQuery: ''});

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  // const sortedNotes = useMemo(()=>{
  //   if(filter.sortQuery) {
  //     return [...notes].sort(note => note.title.toLowerCase().includes(filter.searchQuery))
  //   }
  // },[])

  const searchedNotes = useMemo(() => {
    if (filter.searchQuery) {
      return [...notes].filter(note => note.title.toLowerCase().includes(filter.searchQuery))
    } else {
      return notes
    }
  }, [filter, notes]);

  return (
    <Fragment>
      <Form filter={filter} setFilter={setFilter} />
      <hr />
      {loading ? (
        <Loader />
      ) : (
        <NoteList notes={searchedNotes} removeNote={removeNote} />
      )}
    </Fragment>
  );
};
