import React from "react";
// import ChangeButton from "./ChangeButton";
// import DeleteButton from "./DeleteButton";
import { useContext, useEffect, useState, useMemo } from "react";
import { WorkersContext } from "../../Context/Notes/WorkersContext";
import { databaseRef } from "../../firebase";
import "firebase/firestore";
import {
  ref,
  get,
} from "firebase/database";

export const Statistics = () => {
  const { data, removeData, setChangeVisible, setPostId } =
    useContext(WorkersContext);

    useEffect(() => {
      const fetchOptions = async () => {
        const defectsSnapshot = await get(ref(databaseRef, "defects"));
        const defectsData = [];
        defectsSnapshot.forEach((childSnapshot) => {
          const { workerID, defectiveDetails } = childSnapshot.val(); // получаем только свойство "surname"
          defectsData.push({ workerID, defectiveDetails }); // добавляем объект в массив
        });
        setDefectDetails(defectsData);
      };
      fetchOptions();
    }, []);
  
    const [defectDetails, setDefectDetails] = useState([]);  
    const [statistics, setStatistics] = useState({});

    useMemo(() => {
      data.forEach(worker => {
        const workerId = worker.id;
        let defectCount = 0;
      
        // Для каждого объекта брака из массива defects
        defectDetails.forEach(defect => {
          if (defect.workerID === workerId) {
            defectCount += Number(defect.defectiveDetails);
          }
        });
      
        setStatistics((prevState)=>({...prevState, [workerId]:{defectCount}}))
      });
    }, [data, defectDetails])
    

  return (
    <table className="table table-bordered table-hover table-sm">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Прізвище</th>
          <th scope="col">Ім'я</th>
          <th scope="col">По-баткові</th>
          <th scope="col">Браковані деталі</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data) => (
          <tr key={data.id}>
            <td>{data.u_id}</td>
            <td>{data.surname}</td>
            <td>{data.name}</td>
            <td>{data.patronymic}</td>
            <td>{statistics[data.id]?.defectCount || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
