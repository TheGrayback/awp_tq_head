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
  const { loading, notes, fetchNotes, removeNote } =
    useContext(FirebaseContext);
  const [filter, setFilter] = useState({ sortQuery: "", searchQuery: "" });

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  const sortedNotes = useMemo(() => {
    if (filter.sortQuery) {
      return [...notes].sort((a, b) =>
        a[filter.sortQuery].localeCompare(b[filter.sortQuery])
      );
    } else {
      return notes;
    }
  }, [filter.sortQuery, notes]);

  const searchedNotes = useMemo(() => {
    if (filter.searchQuery) {
      return sortedNotes.filter((note) =>
        note.title.toLowerCase().includes(filter.searchQuery)
      );
    } else {
      return sortedNotes;
    }
  }, [filter.searchQuery, sortedNotes]);

  return (
    <Fragment>
      <Form
        filter={filter}
        setFilter={setFilter}
        sortOptions={[
          { value: "id", name: "Сортування за ID" },
          { value: "title", name: "Сортування за title" },
          { value: "date", name: "Сортування за date" },
        ]}
      />
      <hr />
      {loading ? (
        <Loader />
      ) : (
        <NoteList notes={searchedNotes} removeNote={removeNote} />
      )}
    </Fragment>
  );
};
