import React from "react";
import ChangeButton from "./ChangeButton";
import DeleteButton from "./DeleteButton";

export const Notes = ({ notes, onRemove }) => {
  return (
    <table className="table table-bordered table-hover table-sm">
      {/* <thead>
        <th colSpan={4}>
          AA
        </th>
      </thead> */}
      <tbody>
        {notes.map((note, index) => (
          //<li className="list-group-item note" key={note.id}>
          <tr key={note.id}>
            <td>{index + 1}</td>
            <td>{note.title}</td>
            <td>{note.date}</td>
            <td>
              <DeleteButton
                WhatRemove={{ id: note.id, removeFunction: onRemove }}
              />
              <ChangeButton/>
            </td>
          </tr>

          // {/* <div>
          //   <strong>{note.title}</strong>
          //   <span>{note.date}</span>
          // </div> */}

          //</li>
        ))}
      </tbody>
    </table>
  );
};
