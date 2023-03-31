import React, { useState, useContext } from "react";
import { ReportsFirebaseContext } from "../../Context/reportsFirebase/reportsFirebaseContext";
import { AlertContext } from "../../Context/Alert/AlertContext";

const CreateReports = ({ setModalState }) => {
  const [addValue, setAddValue] = useState({
    projectId: "",
    projectName: "",
    workerID: "",
  });

  const alert = useContext(AlertContext);
  const firebase = useContext(ReportsFirebaseContext);

  const submitAddDataHandler = (event) => {
    event.preventDefault();
    if (addValue) {
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
      alert.show("No note!");
    }
  };

  return (
    <div className="">
      <form onSubmit={submitAddDataHandler}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter worker ID"
            value={addValue.projectId}
            onChange={(e) => setAddValue({...addValue, projectId: e.target.value})}
          />
        </div>
      </form>
      <form onSubmit={submitAddDataHandler}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter surname"
            value={addValue.projectName}
            onChange={(e) => setAddValue({...addValue, projectName: e.target.value})}
          />
        </div>
      </form>
      <form onSubmit={submitAddDataHandler}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter name"
            value={addValue.workerID}
            onChange={(e) => setAddValue({...addValue, workerID: e.target.value})}
          />
        </div>
      </form>
      <button className="btn btn-success mx-3" onClick={submitAddDataHandler}>
        Create Post
      </button>
    </div>
  );
};

export default CreateReports;
