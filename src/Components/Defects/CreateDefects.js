import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../Context/Firebase/defectsFirebaseContext";
import { AlertContext } from "../../Context/Alert/AlertContext";
import { databaseRef } from "../../firebase";
import "firebase/firestore";
import { ref, get } from "firebase/database";

const CreateDefects = ({ setModalState }) => {
  const [addValue, setAddValue] = useState({
    reportID: "", //ID партии деталей
    batchID: "",
    blueprint: "",
    operation: "",
    detailsNumber: 0,
    defectiveDetails: 0,
    //--WORKER--
    workerID: "",
    workerSurname: "",
    //--WORKER--
    //--CONTROLLER--
    controllerID: "",
    controllerSurname: "",
    controllerDateStamp: "",
    //--CONTROLLER--
    defectType: "",
    reason: "",
    summary: "",
    autograph: "",
  });

  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

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
    detailsNumber: 0,
  });

  const handleWorkerOptionChange = (event) => {
    const selectedItem = workerOptions.find(
      (item) => item.id === event.target.value
    );
    setSelectedWorker(selectedItem);
    addValue.workerID = selectedItem.id;
    addValue.workerSurname = selectedItem.surname;
  };

  const handleControllerOptionChange = (event) => {
    const selectedItem = controllerOptions.find(
      (item) => item.id === event.target.value
    );
    setSelectedController(selectedItem);
    addValue.controllerID = selectedItem.id;
    addValue.controllerSurname = selectedItem.surname;
  };

  const handleBatchOptionChange = (event) => {
    const selectedItem = batchOptions.find(
      (item) => item.reportID === event.target.value
    );
    setSelectedBatch(selectedItem);
    addValue.reportID = selectedItem.reportID;
    addValue.batchID = selectedItem.batchID;
    addValue.blueprint = selectedItem.blueprint;
    addValue.detailsNumber = selectedItem.detailsNumber;
  };

  function checkObjectProperties(obj) {
    for (let prop in obj) {
      if (
        obj.hasOwnProperty(prop) &&
        (obj[prop] === "" ||
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
            {/* <input
              maxLength="20"
              id="batchID"
              type={"text"}
              className="form-control"
              placeholder="Enter batchID"
              value={addValue.batchID}
              onChange={(e) =>
                setAddValue({ ...addValue, batchID: e.target.value })
              }
            /> */}
            <select
              id="batchID"
              className="form-control"
              value={selectedBatch.reportID}
              onChange={handleBatchOptionChange}
            >
              <option selected>Заглушка</option>
              {batchOptions.map((option) => (
                <option key={option.reportID} value={option.reportID}>
                  {option.batchID}
                </option>
              ))}
            </select>
          </div>
        </form>
        <form onSubmit={submitAddDataHandler}>
          {/*blueprint*/}
          <label for="blueprint" className="form-label">
            Креслення
          </label>
          <div className="form-group mx-3">
            <input
              disabled
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
          {/*operation*/}
          <label for="operation" className="form-label">
            Операція
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="25"
              id="operation"
              type={"text"}
              className="form-control"
              placeholder="Enter operation"
              value={addValue.operation}
              onChange={(e) =>
                setAddValue({ ...addValue, operation: e.target.value })
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
              disabled
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
          {/*defectiveDetails*/}
          <label for="defectiveDetails" className="form-label">
            К-ть браку
          </label>
          <div className="form-group mx-3">
            <input
              max={addValue.detailsNumber}
              min={1}
              id="defectiveDetails"
              type={"number"}
              className="form-control"
              placeholder="Enter defectiveDetails"
              value={addValue.defectiveDetails}
              onChange={(e) =>
                setAddValue({ ...addValue, defectiveDetails: e.target.value })
              }
            />
          </div>
        </form>

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
        <form onSubmit={submitAddDataHandler}>
          {/*worker*/}
          <label for="worker" className="form-label">
            Робітник
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
        <form onSubmit={submitAddDataHandler}>
          {/*workerDateStamp*/}
          <label for="workerDateStamp" className="form-label">
            Дата виконання
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
            Контролер
          </label>
          <div className="form-group mx-3">
            {/* <input
              maxLength="20"
              id="controller"
              type={"text"}
              className="form-control"
              placeholder="Enter controller"
              value={addValue.controller}
              onChange={(e) =>
                setAddValue({ ...addValue, controller: e.target.value })
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
        <form onSubmit={submitAddDataHandler}>
          {/*controllerDateStamp*/}
          <label for="controllerDateStamp" className="form-label">
            Дата перевірки
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
      </div>
      <div>
        <form>
          {/*defectType*/}
          <label for="defectType" className="form-label">
            Тип браку
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="25"
              id="defectType"
              type={"text"}
              className="form-control"
              placeholder="Enter defectType"
              value={addValue.defectType}
              onChange={(e) =>
                setAddValue({ ...addValue, defectType: e.target.value })
              }
            />
          </div>
        </form>
        <form>
          {/*reason*/}
          <label for="reason" className="form-label">
            Причина
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
              value={addValue.reason}
              onChange={(e) =>
                setAddValue({ ...addValue, reason: e.target.value })
              }
            />
          </div>
        </form>
      </div>
      <div>
        <form>
          {/*summary*/}
          <label for="summary" className="form-label">
            Підсумок
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
              value={addValue.summary}
              onChange={(e) =>
                setAddValue({ ...addValue, summary: e.target.value })
              }
            />
          </div>
        </form>
        <form>
          {/*autograph*/}
          <label for="autograph" className="form-label">
            Підпис
          </label>
          <div className="form-group mx-3">
            <input
              maxLength="25"
              id="autograph"
              type={"text"}
              className="form-control"
              placeholder="Enter autograph"
              value={addValue.autograph}
              onChange={(e) =>
                setAddValue({ ...addValue, autograph: e.target.value })
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDefects;
