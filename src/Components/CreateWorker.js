import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Context/Firebase/FirebaseContext";
import { AlertContext } from "../Context/Alert/AlertContext";

const CreateWorker = ({ setModalState }) => {
  const [addValue, setAddValue] = useState({
    u_id: "",
    surname: "",
    name: "",
  });

  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

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
            value={addValue.u_id}
            onChange={(e) => setAddValue({...addValue, u_id: e.target.value})}
          />
        </div>
      </form>
      <form onSubmit={submitAddDataHandler}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter surname"
            value={addValue.surname}
            onChange={(e) => setAddValue({...addValue, surname: e.target.value})}
          />
        </div>
      </form>
      <form onSubmit={submitAddDataHandler}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter name"
            value={addValue.name}
            onChange={(e) => setAddValue({...addValue, name: e.target.value})}
          />
        </div>
      </form>
      <button className="btn btn-success mx-3" onClick={submitAddDataHandler}>
        Create Post
      </button>
    </div>
  );
};

export default CreateWorker;
