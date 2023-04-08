import React from "react";
import ChangeButton from "./ChangeButton";
import DeleteButton from "./DeleteButton";
import { useContext } from "react";
import { WorkersContext } from "../../Context/Notes/WorkersContext";

export const Defects = () => {
  const { data, removeData, setChangeVisible, setPostId } =
    useContext(WorkersContext);
  return (
    <table className="table table-bordered table-hover table-sm">
      <thead>
        <tr>
          <th scope="col">batchID</th>
          <th scope="col">blueprint</th>
          <th scope="col" style={{width:"100px"}}>detailsNumber</th>
          <th scope="col" style={{width:"100px"}}>defectiveDetails</th>
          <th scope="col">workerSurname</th>
          <th scope="col">controllerSurname</th>
          <th scope="col" style={{width:"100px"}}>controllerDateStamp</th>
          <th scope="col">defectType</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data) => (
          <tr key={data.id}>
            <td>{data.batchID}</td>
            <td>{data.blueprint}</td>
            <td>{data.detailsNumber}</td>
            <td>{data.defectiveDetails}</td>
            <td>{data.workerSurname}</td>
            <td>{data.controllerSurname}</td>
            <td>{data.controllerDateStamp}</td>
            <td>{data.defectType}</td>
            {/* <td>{data.operations}</td> */}
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
