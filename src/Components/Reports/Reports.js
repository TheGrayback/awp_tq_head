import React from "react";
import ChangeButton from "../ChangeButton";
import DeleteButton from "../DeleteButton";
import { useContext } from "react";
import { WorkersContext } from "../../Context/Notes/WorkersContext";

export const Reports = () => {
  const { data, removeData, setChangeVisible, setPostId } =
    useContext(WorkersContext);
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead>
        <tr>
          <th scope="col">ID партії</th>
          <th scope="col">Креслення</th>
          <th scope="col" style={{width:"150px"}}>К-ть деталей</th>
          <th scope="col" style={{width:"150px"}}>К-ть операцій</th>
          <th scope="col">Статус</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data) => (
          <tr key={data.id}>
            <td>{data.batchID}</td>
            <td>{data.blueprint}</td>
            <td>{Number(data.detailsNumber)}</td>
            <td>{Number(data.completed)}/{Number(data.all)}</td>
            <td>{data.status}</td>
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
