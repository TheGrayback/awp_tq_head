import React from "react";
import ChangeButton from "./ChangeButton";
import DeleteButton from "./DeleteButton";
import { useContext } from "react";
import { WorkersContext } from "../Context/Notes/WorkersContext";

export const Workers = () => {
  const { data, removeData, setChangeVisible, setPostId } =
    useContext(WorkersContext);
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
        {data.map((data, index) => (
          <tr key={data.id}>
            <td>{index + 1}</td>
            <td>{data.title}</td>
            <td>{data.date}</td>
            <DeleteButton
              WhatRemove={{ id: data.id, removeFunction: removeData }}
            />
            <ChangeButton
              setChangeVisible={setChangeVisible}
              setPostId={setPostId}
              id={data.id}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
