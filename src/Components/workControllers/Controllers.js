import React from "react";
import ChangeButton from "../ChangeButton";
import DeleteButton from "../DeleteButton";
import { useContext } from "react";
import { WorkersContext } from "../../Context/Notes/WorkersContext";

export const Controllers = () => {
  const { data, removeData, setChangeVisible, setPostId } =
    useContext(WorkersContext);
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead>
      <tr>
          <th scope="col">ID</th>
          <th scope="col">Прізвище</th>
          <th scope="col">Ім'я</th>
          <th scope="col">По-батькові</th>
          <th scope="col">День народження</th>
          <th scope="col">Посада</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data) => (
          <tr key={data.id}>
            <td>{data.u_id}</td>
            <td>{data.surname}</td>
            <td>{data.name}</td>
            <td>{data.patronymic}</td>
            <td>{data.birthdate}</td>
            {/* <td>{data.profession}</td> */}
            <td>{data.post}</td>
            <DeleteButton
              WhatRemove={{ id: data.id, removeFunction: removeData }}
            />
            <ChangeButton
              setChangeVisible={setChangeVisible}
              setPostId={setPostId}
              // id={data.id}
              currentData={data}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
