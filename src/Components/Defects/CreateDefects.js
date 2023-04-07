import React, { useState, useContext, useEffect } from "react";
import { ReportsFirebaseContext } from "../../Context/reportsFirebase/reportsFirebaseContext";
import { AlertContext } from "../../Context/Alert/AlertContext";
import { databaseRef } from "../../firebase";
import "firebase/firestore";
import {
  ref,
  get,
} from "firebase/database";

const CreateReports = ({ setModalState }) => {
  const [addValue, setAddValue] = useState({
    batchID: "", //ID партии деталей
    blueprint: "",
    detailsNumber: "",
    workerID: "",
    workerSurname: "",
    workerDateStamp: "",
    controller: "",
    // {
    //   controllerID: "",
    //   surname: "",
    // },
    controllerDateStamp: "",
    all: "",
    completed: "",
    defects: "",
  });

  const catalog = "workers";

  const alert = useContext(AlertContext);
  const firebase = useContext(ReportsFirebaseContext);

  useEffect(() => {
    const fetchOptions = async () => {
      const snapshot = await get(ref(databaseRef, catalog));
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        const { surname } = childSnapshot.val(); // получаем только свойство "surname"
        const id = childSnapshot.key; // получаем ключ объекта
        dataArray.push({ id, surname }); // добавляем объект в массив
      });
      setOptions(dataArray);
      console.log(dataArray);
    };
    fetchOptions();
  }, []);

  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedOption] = useState({
    id: "",
    surname: ""
  });

  const handleOptionChange = (event) => {
    const selectedItem = options.find((item) => item.id === event.target.value);
    setSelectedOption(selectedItem);
    addValue.workerID = selectedItem.id;
    addValue.workerSurname = selectedItem.surname;
  };

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
              batchID
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
            blueprint
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
            detailsNumber
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
        <form onSubmit={submitAddDataHandler}>
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
              value={addValue.worker}
              onChange={(e) =>
                setAddValue({ ...addValue, worker: e.target.value })
              }
            /> */}
            <select
              id="options-select"
              className="form-control"
              value={selectedItem.id}
              onChange={handleOptionChange}
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.surname}
                </option>
              ))}
            </select>
          </div>
        </form>
        <br></br>
        <div>
          <button
            className="btn btn-success mx-3"
            onClick={submitAddDataHandler}
          >
            Create worker
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={submitAddDataHandler}>
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
              value={addValue.workerDateStamp}
              onChange={(e) =>
                setAddValue({ ...addValue, workerDateStamp: e.target.value })
              }
            />
          </div>
        </form>
        <form onSubmit={submitAddDataHandler}>
          {/*controller*/}
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
          </div>
        </form>
        <form onSubmit={submitAddDataHandler}>
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
              value={addValue.controllerDateStamp}
              onChange={(e) =>
                setAddValue({
                  ...addValue,
                  controllerDateStamp: e.target.value,
                })
              }
            />
          </div>
        </form>
        <form onSubmit={submitAddDataHandler}>
          {/*operationsCount*/}
          <label for="operationsCount" className="form-label">
            operationsCount
          </label>
          <div className="form-group mx-3">
            <input
              max={100}
              min={0}
              id="operationsCount"
              type={"number"}
              className="form-control"
              placeholder="Enter operationsCount"
              value={addValue.completed}
              onChange={(e) =>
                setAddValue({ ...addValue, completed: e.target.value })
              }
            />
            <input
              max={100}
              min={0}
              id="operationsCount"
              type={"number"}
              className="form-control"
              placeholder="Enter operationsCount"
              value={addValue.all}
              onChange={(e) =>
                setAddValue({ ...addValue, all: e.target.value })
              }
            />
          </div>
        </form>
      </div>
      <form>
        {/*defects*/}
        <label for="defects" className="form-label">
          defects
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
