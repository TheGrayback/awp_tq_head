import React, { useState, useContext, useEffect, useMemo } from "react";
import { ReportsFirebaseContext } from "../../Context/reportsFirebase/reportsFirebaseContext";
import { AlertContext } from "../../Context/Alert/AlertContext";
import { databaseRef } from "../../firebase";
import "firebase/firestore";
import { ref, get } from "firebase/database";

const ChangeReports = ({ isVisible, setModalState, postId: postData }) => {
  const [changeValue, setChangeValue] = useState({
    batchID: postData.batchID, //ID партии деталей
    blueprint: postData.blueprint,
    detailsNumber: postData.detailsNumber,
    all: postData.all,
    completed: postData.completed,
    defects: postData.defects,
  });

  useMemo(() => {
    if (isVisible === true) {
      setChangeValue(postData);
    }
  }, [postData, isVisible]);

  // useEffect(() => {
  //   console.log("updated");
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
  //   changeValue.workerID = selectedItem.id;
  //   changeValue.workerSurname = selectedItem.surname;
  // };

  // const handleControllerOptionChange = (event) => {
  //   const selectedItem = controllerOptions.find(
  //     (item) => item.id === event.target.value
  //   );
  //   setSelectedController(selectedItem);
  //   changeValue.controllerID = selectedItem.id;
  //   changeValue.controllerSurname = selectedItem.surname;
  // };

  const alert = useContext(AlertContext);
  const firebase = useContext(ReportsFirebaseContext);

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
            <input
              maxLength="20"
              id="batchID"
              type={"text"}
              className="form-control"
              placeholder="Enter batchID"
              value={changeValue.batchID}
              onChange={(e) =>
                setChangeValue({ ...changeValue, batchID: e.target.value })
              }
            />
          </div>
        </form>
        <form onSubmit={submitChangeHandler}>
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
              value={changeValue.blueprint}
              onChange={(e) =>
                setChangeValue({ ...changeValue, blueprint: e.target.value })
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
              max={1000}
              min={1}
              id="detailsNumber"
              type={"number"}
              className="form-control"
              placeholder="Enter detailsNumber"
              value={changeValue.detailsNumber}
              onChange={(e) =>
                setChangeValue({
                  ...changeValue,
                  detailsNumber: e.target.value,
                })
              }
            />
          </div>
        </form>
        {/* <form onSubmit={submitChangeHandler}>
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
              value={changeValue.worker}
              onChange={(e) =>
                setChangeValue({ ...changeValue, worker: e.target.value })
              }
            />
            <select
              id="options-select"
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
            onClick={submitChangeHandler}
          >
            Change Post
          </button>
        </div>
      </div>
      <div>
        {/* <form onSubmit={submitChangeHandler}>
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
              value={changeValue.workerDateStamp}
              onChange={(e) =>
                setChangeValue({
                  ...changeValue,
                  workerDateStamp: e.target.value,
                })
              }
            />
          </div>
        </form> */}
        {/* <form onSubmit={submitChangeHandler}>
          controller
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
              value={changeValue.controller}
              onChange={(e) =>
                setChangeValue({ ...changeValue, controller: e.target.value })
              }
            />
            <select
              id="options-select"
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
        </form> */} {/*controller*/}
        {/* <form onSubmit={submitChangeHandler}>
          controllerDateStamp
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
        </form> */} {/*controllerDateStamp*/}
        <form onSubmit={submitChangeHandler}>
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
              placeholder="Enter all operationsCount"
              value={changeValue.all}
              onChange={(e) =>
                setChangeValue({ ...changeValue, all: e.target.value })
              }
            />
          </div>
          <label for="operationsCompleted" className="form-label">
          operationsCompleted
          </label>
          <div className="form-group mx-3">
            <input
              max={changeValue.all}
              min={0}
              id="operationsCompleted"
              type={"number"}
              className="form-control"
              placeholder="Enter completed operationsCount"
              value={changeValue.completed}
              onChange={(e) =>
                setChangeValue({ ...changeValue, completed: e.target.value })
              }
            />
          </div>
        </form>
        <form onSubmit={submitChangeHandler}>
          {/*status*/}
          <label for="status" className="form-label">
          status
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="25"
              id="status"
              type={"text"}
              className="form-control"
              placeholder="Enter status"
              value={changeValue.status}
              onChange={(e) =>
                setChangeValue({ ...changeValue, status: e.target.value })
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
            value={changeValue.defects}
            onChange={(e) =>
              setChangeValue({ ...changeValue, defects: e.target.value })
            }
          />
        </div>
      </form>
    </div>
  );
};

export default ChangeReports;
