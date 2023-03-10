import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Context/Firebase/firebaseContext";
import { AlertContext } from "../Context/Alert/AlertContext";

const CreatePost = ({ setModalState }) => {
  const [addValue, setAddValue] = useState("");

  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const submitAddNoteHandler = (event) => {
    event.preventDefault();
    if (addValue.trim()) {
      firebase
        .addNote(addValue.trim())
        .then(() => {
          alert.show("Created", "success");
        })
        .catch(() => {
          alert.show("Not created", "danger");
        });
      setAddValue(addValue);
      setModalState(false);
    } else {
      alert.show("No note name!");
    }
  };

  return (
    <div className="">
      <form onSubmit={submitAddNoteHandler}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter note name"
            value={addValue}
            onChange={(e) => setAddValue(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
