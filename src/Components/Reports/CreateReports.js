import React, { useState, useContext, useEffect } from "react";
import { ReportsFirebaseContext } from "../../Context/reportsFirebase/reportsFirebaseContext";
import { AlertContext } from "../../Context/Alert/AlertContext";
import { databaseRef } from "../../firebase";
import "firebase/firestore";
import { ref, get } from "firebase/database";

const CreateReports = ({ setModalState }) => {
  const [addValue, setAddValue] = useState({
    batchID: "", //ID партии деталей
    blueprint: "",
    detailsNumber: 0,
    all: 0,
    completed: 0,
    status: "",
    defects: "",
  });

  const alert = useContext(AlertContext);
  const firebase = useContext(ReportsFirebaseContext);

  // useEffect(() => {
  //   const fetchOptions = async () => {
  //     // const workersSnapshot = await get(ref(databaseRef, "workers"));
  //     const controllersSnapshot = await get(ref(databaseRef, "controllers"));
  //     // const workersData = [];
  //     const controllersData = [];
  //     // workersSnapshot.forEach((childSnapshot) => {
  //     //   const { surname } = childSnapshot.val(); // получаем только свойство "surname"
  //     //   const id = childSnapshot.key; // получаем ключ объекта
  //     //   workersData.push({ id, surname }); // добавляем объект в массив
  //     // });
  //     controllersSnapshot.forEach((childSnapshot) => {
  //       const { surname } = childSnapshot.val(); // получаем только свойство "surname"
  //       const id = childSnapshot.key; // получаем ключ объекта
  //       controllersData.push({ id, surname }); // добавляем объект в массив
  //     });
  //     // setWorkerOptions(workersData);
  //     setControllerOptions(controllersData);
  //     // console.log(workersData);
  //   };
  //   fetchOptions();
  // }, []);

  // const [workerOptions, setWorkerOptions] = useState([]);
  // const [selectedWorker, setSelectedWorker] = useState({
  //   id: "",
  //   surname: "",
  // });

  // const [controllerOptions, setControllerOptions] = useState([]);
  // const [selectedController, setSelectedController] = useState({
  //   id: "",
  //   surname: "",
  // });

  // const handleWorkerOptionChange = (event) => {
  //   const selectedItem = workerOptions.find(
  //     (item) => item.id === event.target.value
  //   );
  //   setSelectedWorker(selectedItem);
  //   addValue.workerID = selectedItem.id;
  //   addValue.workerSurname = selectedItem.surname;
  // };

  // const handleControllerOptionChange = (event) => {
  //   const selectedItem = controllerOptions.find(
  //     (item) => item.id === event.target.value
  //   );
  //   setSelectedController(selectedItem);
  //   addValue.controllerID = selectedItem.id;
  //   addValue.controllerSurname = selectedItem.surname;
  // };

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

  const submitAddDataHandler = (event) => {
    event.preventDefault();
    console.log(addValue);
    if (checkObjectProperties(addValue)) {
      firebase
        .addData(addValue)
        .then(() => {
          alert.show("Created", "success");
        })
        .catch(() => {
          alert.show("Not created", "danger");
        });
      setAddValue(addValue);
      setModalState(false);
    } else {
      alert.show("No note! Empty fields!");
    }
  };

  return (
    <div className="" style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <form onSubmit={submitAddDataHandler}>
          {/*batchID*/}
          <div className="form-group mx-3">
            <label for="batchID" className="form-label">
              ID партії
            </label>
            <input
              maxLength="20"
              id="batchID"
              type={"text"}
              className="form-control"
              placeholder="Enter batchID"
              value={addValue.batchID}
              onChange={(e) =>
                setAddValue({ ...addValue, batchID: e.target.value })
              }
            />
          </div>
        </form>
        <form onSubmit={submitAddDataHandler}>
          {/*blueprint*/}
          <label for="blueprint" className="form-label">
            Креслення
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="25"
              id="blueprint"
              type={"text"}
              className="form-control"
              placeholder="Enter blueprint"
              value={addValue.blueprint}
              onChange={(e) =>
                setAddValue({ ...addValue, blueprint: e.target.value })
              }
            />
          </div>
        </form>
        <form onSubmit={submitAddDataHandler}>
          {/*detailsNumber*/}
          <label for="detailsNumber" className="form-label">
            К-ть деталей
          </label>
          <div className="form-group mx-3">
            <input
              max={1000}
              min={1}
              id="detailsNumber"
              type={"number"}
              className="form-control"
              placeholder="Enter detailsNumber"
              value={addValue.detailsNumber}
              onChange={(e) =>
                setAddValue({ ...addValue, detailsNumber: e.target.value })
              }
            />
          </div>
        </form>
        {/* <form onSubmit={submitAddDataHandler}>
          worker
          <label for="worker" className="form-label">
            worker
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="20"
              id="worker"
              type={"text"}
              className="form-control"
              placeholder="Enter worker"
              value={addValue.worker}
              onChange={(e) =>
                setAddValue({ ...addValue, worker: e.target.value })
              }
            />
            <select
              id="workerOptions-select"
              className="form-control"
              value={selectedWorker.id}
              onChange={handleWorkerOptionChange}
            >
              {workerOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.surname}
                </option>
              ))}
            </select>
          </div>
        </form> */}
        <br></br>
        <div>
          <button
            className="btn btn-success mx-3"
            onClick={submitAddDataHandler}
          >
            Створити
          </button>
        </div>
      </div>
      <div>
        {/* <form onSubmit={submitAddDataHandler}>
        workerDateStamp
        <label for="workerDateStamp" className="form-label">
          workerDateStamp
        </label>
        <div className="form-group mx-3">
          <input
            id="workerDateStamp"
            type={"date"}
            className="form-control"
            placeholder="Enter workerDateStamp"
            value={addValue.workerDateStamp}
            onChange={(e) =>
              setAddValue({ ...addValue, workerDateStamp: e.target.value })
            }
          />
        </div>
        </form> */}
        {/* <form onSubmit={submitAddDataHandler}>
          
          <label for="controller" className="form-label">
            controller
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="20"
              id="controller"
              type={"text"}
              className="form-control"
              placeholder="Enter controller"
              value={addValue.controller}
              onChange={(e) =>
                setAddValue({ ...addValue, controller: e.target.value })
              }
            />
            <select
              id="workerOptions-select"
              className="form-control"
              value={selectedController.id}
              onChange={handleControllerOptionChange}
            >
              {controllerOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.surname}
                </option>
              ))}
            </select>
          </div>
        </form> */}{" "}
        {/*controller*/}
        {/* <form onSubmit={submitAddDataHandler}>

          <label for="controllerDateStamp" className="form-label">
            controllerDateStamp
          </label>
          <div className="form-group mx-3">
            <input
              id="controllerDateStamp"
              type={"date"}
              className="form-control"
              placeholder="Enter controllerDateStamp"
              value={addValue.controllerDateStamp}
              onChange={(e) =>
                setAddValue({
                  ...addValue,
                  controllerDateStamp: e.target.value,
                })
              }
            />
          </div>
        </form>  */}{" "}
        {/*controllerDateStamp*/}
        <form onSubmit={submitAddDataHandler}>
          {/*operationsCount*/}
          <label for="operationsCount" className="form-label">
            К-ть операцій
          </label>

          <div className="form-group mx-3">
            <input
              max={100}
              min={0}
              id="operationsCount"
              type={"number"}
              className="form-control"
              placeholder="Enter all operationsCount"
              value={addValue.all}
              onChange={(e) =>
                setAddValue({ ...addValue, all: e.target.value })
              }
            />
          </div>
          <label for="operationsCompleted" className="form-label">
          Схвалені операції
          </label>
          <div className="form-group mx-3">
            <input
              max={addValue.all}
              min={0}
              id="operationsCompleted"
              type={"number"}
              className="form-control"
              placeholder="Enter completed operationsCount"
              value={addValue.completed}
              onChange={(e) =>
                setAddValue({ ...addValue, completed: e.target.value })
              }
            />
          </div>
        </form>
        <form onSubmit={submitAddDataHandler}>
          {/*status*/}
          <label for="status" className="form-label">
          Статус
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="25"
              id="status"
              type={"text"}
              className="form-control"
              placeholder="Enter status"
              value={addValue.status}
              onChange={(e) =>
                setAddValue({ ...addValue, status: e.target.value })
              }
            />
          </div>
        </form>
      </div>
      <form>
        {/*defects*/}
        <label for="defects" className="form-label">
          Примітки
        </label>
        <div className="form-group mx-3">
          <textarea
            rows={10}
            cols={50}
            maxLength="200"
            style={{ resize: "none" }}
            id="defects"
            type={"text"}
            className="form-control"
            placeholder="Enter defects"
            value={addValue.defects}
            onChange={(e) =>
              setAddValue({ ...addValue, defects: e.target.value })
            }
          />
        </div>
      </form>
    </div>
  );
};

export default CreateReports;
