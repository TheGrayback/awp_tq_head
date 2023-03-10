import React from "react";
import ChangeButton from "./ChangeButton";
import DeleteButton from "./DeleteButton";

export const Notes = ({ notes, onRemove, setChangeVisible, setPostId }) => {
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">title</th>
          <th scope="col">date</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note, index) => (
          <tr key={note.id}>
            <td>{index + 1}</td>
            <td>{note.title}</td>
            <td>{note.date}</td>
            <DeleteButton
              WhatRemove={{ id: note.id, removeFunction: onRemove }}
            />
            <ChangeButton setChangeVisible={setChangeVisible} setPostId={setPostId} id={note.id}/>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
