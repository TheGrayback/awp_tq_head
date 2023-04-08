import React, { useState, useContext, useEffect, useMemo } from "react";
import { FirebaseContext } from "../../Context/Firebase/defectsFirebaseContext";
import { AlertContext } from "../../Context/Alert/AlertContext";
import { databaseRef } from "../../firebase";
import "firebase/firestore";
import {
  ref,
  get,
} from "firebase/database";

const ChangeDefects = ({ isVisible, setModalState, postId: postData }) => {
  const [changeValue, setChangeValue] = useState({
    reportID: postData.reportID, //ID партии деталей
    batchID: postData.batchID,
    blueprint: postData.blueprint,
    operation: postData.operation,
    detailsNumber: postData.detailsNumber,
    defectiveDetails: postData.defectiveDetails,
    //--WORKER--
    workerID: postData.workerID,
    workerSurname: postData.workerSurname,
    //--WORKER--
    //--CONTROLLER--
    controllerID: postData.controllerID,
    controllerSurname: postData.controllerSurname,
    controllerDateStamp: postData.controllerDateStamp,
    //--CONTROLLER--
    defectType: postData.defectType,
    reason: postData.reason,
    summary: postData.summary,
    autograph: postData.autograph,
  });
  console.log(postData, changeValue, isVisible);
  
  useMemo(() => {
    if(isVisible === true) {
      setChangeValue(postData);
    }
  },[postData, isVisible])

  useEffect(() => {
    const fetchOptions = async () => {
      const workersSnapshot = await get(ref(databaseRef, "workers"));
      const controllersSnapshot = await get(ref(databaseRef, "controllers"));
      const batchSnapshot = await get(ref(databaseRef, "reports"));
      const workersData = [];
      const controllersData = [];
      const batchData = [];
      workersSnapshot.forEach((childSnapshot) => {
        const { surname } = childSnapshot.val(); // получаем только свойство "surname"
        const id = childSnapshot.key; // получаем ключ объекта
        workersData.push({ id, surname }); // добавляем объект в массив
      });
      controllersSnapshot.forEach((childSnapshot) => {
        const { surname } = childSnapshot.val(); // получаем только свойство "surname"
        const id = childSnapshot.key; // получаем ключ объекта
        controllersData.push({ id, surname }); // добавляем объект в массив
      });
      batchSnapshot.forEach((childSnapshot) => {
        const { batchID, blueprint, detailsNumber } = childSnapshot.val(); // получаем только свойство "surname"
        const reportID = childSnapshot.key; // получаем ключ объекта
        batchData.push({ reportID, batchID, blueprint, detailsNumber }); // добавляем объект в массив
      });
      setWorkerOptions(workersData);
      setControllerOptions(controllersData);
      setbatchOptions(batchData);
    };
    fetchOptions();
  }, []);

  const [workerOptions, setWorkerOptions] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState({
    id: "",
    surname: "",
  });

  const [controllerOptions, setControllerOptions] = useState([]);
  const [selectedController, setSelectedController] = useState({
    id: "",
    surname: "",
  });

  const [batchOptions, setbatchOptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({
    reportID: "", //ID партии деталей
    batchID: "",
    blueprint: "",
    detailsNumber: "",
  });

  const handleWorkerOptionChange = (event) => {
    const selectedItem = workerOptions.find(
      (item) => item.id === event.target.value
    );
    setSelectedWorker(selectedItem);
    changeValue.workerID = selectedItem.id;
    changeValue.workerSurname = selectedItem.surname;
  };

  const handleControllerOptionChange = (event) => {
    const selectedItem = controllerOptions.find(
      (item) => item.id === event.target.value
    );
    setSelectedController(selectedItem);
    changeValue.controllerID = selectedItem.id;
    changeValue.controllerSurname = selectedItem.surname;
  };

  const handleBatchOptionChange = (event) => {
    const selectedItem = batchOptions.find(
      (item) => item.reportID === event.target.value
    );
    setSelectedBatch(selectedItem);
    changeValue.reportID = selectedItem.reportID;
    changeValue.batchID = selectedItem.batchID;
    changeValue.blueprint = selectedItem.blueprint;
    changeValue.detailsNumber = selectedItem.detailsNumber;
  };


  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  function checkObjectProperties(obj) {
    for (let prop in obj) {
      if (
        obj.hasOwnProperty(prop) &&
        (obj[prop].trim() === "" ||
          obj[prop] === null ||
          obj[prop] === undefined)
      ) {
        return false; // Если свойство пустое, возвращаем false
      }
    }
    return true; // Если все свойства заполнены, возвращаем true
  }

  const submitChangeHandler = async (event) => {
    event.preventDefault();
    if (checkObjectProperties(changeValue)) {
      console.log(changeValue);
      await firebase
        .changeData(postData.id, changeValue)
        .then(() => {
          alert.show("Created", "success");
        })
        .catch(() => {
          alert.show("Not created", "danger");
        });
      // setChangeValue(changeValue);
      setModalState(false);
    } else {
      alert.show("No note!");
    }
  };

  return (
    <div className="" style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <form onSubmit={submitChangeHandler}>
          {/*batchID*/}
          <div className="form-group mx-3">
            <label for="batchID" className="form-label">
              batchID
            </label>
            {/* <input
              maxLength="20"
              id="batchID"
              type={"text"}
              className="form-control"
              placeholder="Enter batchID"
              value={changeValue.batchID}
              onChange={(e) =>
                setChangeValue({ ...changeValue, batchID: e.target.value })
              }
            /> */}
            <select
              id="batchID"
              className="form-control"
              value={selectedBatch.reportID}
              onChange={handleBatchOptionChange}
            ><option selected>Заглушка</option>
              {batchOptions.map((option) => (
                <option key={option.reportID} value={option.reportID}>
                  {option.batchID}
                </option>
              ))}
            </select>
          </div>
        </form>
        <form onSubmit={submitChangeHandler}>
          {/*blueprint*/}
          <label for="blueprint" className="form-label">
            blueprint
          </label>
          <div className="form-group mx-3">
            <input
              disabled
              maxLength="25"
              id="blueprint"
              type={"text"}
              className="form-control"
              placeholder="Enter blueprint"
              value={changeValue.blueprint}
              onChange={(e) =>
                setChangeValue({ ...changeValue, blueprint: e.target.value })
              }
            />
          </div>
        </form>
        <form onSubmit={submitChangeHandler}>
          {/*operation*/}
          <label for="operation" className="form-label">
            operation
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="25"
              id="operation"
              type={"text"}
              className="form-control"
              placeholder="Enter operation"
              value={changeValue.operation}
              onChange={(e) =>
                setChangeValue({ ...changeValue, operation: e.target.value })
              }
            />
          </div>
        </form>
        <form onSubmit={submitChangeHandler}>
          {/*detailsNumber*/}
          <label for="detailsNumber" className="form-label">
            detailsNumber
          </label>
          <div className="form-group mx-3">
            <input
              disabled
              max={1000}
              min={1}
              id="detailsNumber"
              type={"number"}
              className="form-control"
              placeholder="Enter detailsNumber"
              value={changeValue.detailsNumber}
              onChange={(e) =>
                setChangeValue({ ...changeValue, detailsNumber: e.target.value })
              }
            />
          </div>
        </form>
        <form onSubmit={submitChangeHandler}>
          {/*defectiveDetails*/}
          <label for="defectiveDetails" className="form-label">
            defectiveDetails
          </label>
          <div className="form-group mx-3">
            <input
              max={changeValue.detailsNumber}
              min={1}
              id="defectiveDetails"
              type={"number"}
              className="form-control"
              placeholder="Enter defectiveDetails"
              value={changeValue.defectiveDetails}
              onChange={(e) =>
                setChangeValue({ ...changeValue, defectiveDetails: e.target.value })
              }
            />
          </div>
        </form>

        <br></br>
        <div>
          <button
            className="btn btn-success mx-3"
            onClick={submitChangeHandler}
          >
            Create worker
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={submitChangeHandler}>
          {/*worker*/}
          <label for="worker" className="form-label">
            worker
          </label>
          <div className="form-group mx-3">
            {/* <input
              maxLength="20"
              id="worker"
              type={"text"}
              className="form-control"
              placeholder="Enter worker"
              value={changeValue.worker}
              onChange={(e) =>
                setChangeValue({ ...changeValue, worker: e.target.value })
              }
            /> */}
            <select
              id="options-select"
              className="form-control"
              value={selectedWorker.id}
              onChange={handleWorkerOptionChange}
            ><option selected>Заглушка</option>
              {workerOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.surname}
                </option>
              ))}
            </select>
          </div>
        </form>
        <form onSubmit={submitChangeHandler}>
          {/*workerDateStamp*/}
          <label for="workerDateStamp" className="form-label">
            workerDateStamp
          </label>
          <div className="form-group mx-3">
            <input
              id="workerDateStamp"
              type={"date"}
              className="form-control"
              placeholder="Enter workerDateStamp"
              value={changeValue.workerDateStamp}
              onChange={(e) =>
                setChangeValue({ ...changeValue, workerDateStamp: e.target.value })
              }
            />
          </div>
        </form>
        <form onSubmit={submitChangeHandler}>
          {/*controller*/}
          <label for="controller" className="form-label">
            controller
          </label>
          <div className="form-group mx-3">
            {/* <input
              maxLength="20"
              id="controller"
              type={"text"}
              className="form-control"
              placeholder="Enter controller"
              value={changeValue.controller}
              onChange={(e) =>
                setChangeValue({ ...changeValue, controller: e.target.value })
              }
            /> */}
            <select
              id="options-select"
              className="form-control"
              value={selectedController.id}
              onChange={handleControllerOptionChange}
            ><option selected>Заглушка</option>
              {controllerOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.surname}
                </option>
              ))}
            </select>
          </div>
        </form>
        <form onSubmit={submitChangeHandler}>
          {/*controllerDateStamp*/}
          <label for="controllerDateStamp" className="form-label">
            controllerDateStamp
          </label>
          <div className="form-group mx-3">
            <input
              id="controllerDateStamp"
              type={"date"}
              className="form-control"
              placeholder="Enter controllerDateStamp"
              value={changeValue.controllerDateStamp}
              onChange={(e) =>
                setChangeValue({
                  ...changeValue,
                  controllerDateStamp: e.target.value,
                })
              }
            />
          </div>
        </form>
      </div>
      <div>
        <form>
          {/*defectType*/}
          <label for="defectType" className="form-label">
            defectType
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="25"
              id="defectType"
              type={"text"}
              className="form-control"
              placeholder="Enter defectType"
              value={changeValue.defectType}
              onChange={(e) =>
                setChangeValue({ ...changeValue, defectType: e.target.value })
              }
            />
          </div>
        </form>
        <form>
          {/*reason*/}
          <label for="reason" className="form-label">
            reason
          </label>
          <div className="form-group mx-3">
            <textarea
              rows={10}
              cols={50}
              maxLength="200"
              style={{ resize: "none" }}
              id="reason"
              type={"text"}
              className="form-control"
              placeholder="Enter reason"
              value={changeValue.reason}
              onChange={(e) =>
                setChangeValue({ ...changeValue, reason: e.target.value })
              }
            />
          </div>
        </form>
      </div>
      <div>
        <form>
          {/*summary*/}
          <label for="summary" className="form-label">
            summary
          </label>
          <div className="form-group mx-3">
            <textarea
              rows={10}
              cols={50}
              maxLength="200"
              style={{ resize: "none" }}
              id="summary"
              type={"text"}
              className="form-control"
              placeholder="Enter summary"
              value={changeValue.summary}
              onChange={(e) =>
                setChangeValue({ ...changeValue, summary: e.target.value })
              }
            />
          </div>
        </form>
        <form>
          {/*autograph*/}
          <label for="autograph" className="form-label">
            autograph
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="25"
              id="autograph"
              type={"text"}
              className="form-control"
              placeholder="Enter autograph"
              value={changeValue.autograph}
              onChange={(e) =>
                setChangeValue({ ...changeValue, autograph: e.target.value })
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeDefects;
