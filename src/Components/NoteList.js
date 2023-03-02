import React from "react";
import { Notes } from "./Notes";

const NoteList = ({ notes, removeNote }) => {
  return (
    <div>
      <Notes notes={notes} onRemove={removeNote} />
    </div>
  );
};

export default NoteList;
