import React from "react";
import { Notes } from "./Notes";

const NoteList = ({ notes, removeNote, setChangeVisible, setPostId }) => {
  return (
    <div>
      <Notes notes={notes} onRemove={removeNote} setChangeVisible={setChangeVisible} setPostId={setPostId} />
    </div>
  );
};

export default NoteList;
