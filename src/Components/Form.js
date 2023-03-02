import React, { Fragment, useState, useContext } from "react";
import { AlertContext } from "../Context/Alert/AlertContext";
import { FirebaseContext } from "../Context/Firebase/firebaseContext";

export const Form = () => {
  const [value, setValue] = useState("");
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);
  const submitHandler = (event) => {
    event.preventDefault();
    if (value.trim()) {
      firebase
        .addNote(value.trim())
        .then(() => {
          alert.show("Created", "success");
        })
        .catch(() => {
          alert.show("Not created", "danger");
        });
      setValue(value);
    } else {
      alert.show("No note name!");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-group mx-3">
        <input
          type={"text"}
          className="form-control"
          placeholder="Enter note name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  );
};
