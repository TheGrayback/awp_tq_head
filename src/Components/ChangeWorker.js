import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Context/Firebase/FirebaseContext";
import { AlertContext } from "../Context/Alert/AlertContext";

const ChangeWorker = ({ setModalState, postId }) => {
  const [changeValue, setChangeValue] = useState("");

  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitChangeHandler = (event) => {
    event.preventDefault();
    if (changeValue.trim()) {
      firebase
        .changeData(postId, changeValue.trim())
        .then(() => {
          alert.show("Created", "success");
        })
        .catch(() => {
          alert.show("Not created", "danger");
        });
      setChangeValue(changeValue);
      setModalState(false);
    } else {
      alert.show("No note name!");
    }
  };

  return (
    <div className="">
      <form onSubmit={submitChangeHandler}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder="Change note name"
            value={changeValue}
            onChange={(e) => setChangeValue(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangeWorker;
