import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../Context/Firebase/controllersFirebaseContext";
import { AlertContext } from "../../Context/Alert/AlertContext";

const CreateController = ({ setModalState }) => {
  const [addValue, setAddValue] = useState({
    u_id: "",
    surname: "",
    name: "",
    patronymic: "",
    birthdate: "",
    // profession: "",
    post: "",
  });

  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  function checkObjectProperties(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop) && obj[prop].trim() === '') {
        return false; // Если свойство пустое, возвращаем false
      }
    }
    return true; // Если все свойства заполнены, возвращаем true
  }

  const submitAddDataHandler = (event) => {
    event.preventDefault();
    if (checkObjectProperties(addValue)) {
      console.log(addValue);
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
      <form onSubmit={submitAddDataHandler}> {/*U_ID*/}
        <div className="form-group mx-3">
          <label for="u_id" className="form-label">
            U_ID
          </label>
          <input
          maxLength={20}
            id="u_id"
            type={"text"}
            className="form-control"
            placeholder="Enter worker ID"
            value={addValue.u_id}
            onChange={(e) => setAddValue({ ...addValue, u_id: e.target.value })}
          />
        </div>
      </form>
      <form onSubmit={submitAddDataHandler}> {/*Full name*/}
        <label for="surname" className="form-label">
          Full name
        </label>
        <div className="form-group input-group mx-3">
          <input
          maxLength={20}
            id="surname"
            type={"text"}
            className="form-control"
            placeholder="Enter surname"
            value={addValue.surname}
            onChange={(e) =>
              setAddValue({ ...addValue, surname: e.target.value })
            }
          />
          <input
          maxLength={20}
            type={"text"}
            className="form-control"
            placeholder="Enter name"
            value={addValue.name}
            onChange={(e) => setAddValue({ ...addValue, name: e.target.value })}
          />
          <input
          maxLength={20}
            type={"text"}
            className="form-control"
            placeholder="Enter patronymic"
            value={addValue.patronymic}
            onChange={(e) =>
              setAddValue({ ...addValue, patronymic: e.target.value })
            }
          />
        </div>
      </form> 
      <form onSubmit={submitAddDataHandler}>{/*birthdate*/}
        <label for="birthdate" className="form-label">
          birthdate
        </label>
        <div className="form-group mx-3">
          <input
            id="birthdate"
            type={"date"}
            className="form-control"
            placeholder="Enter worker birthdate"
            value={addValue.birthdate}
            onChange={(e) => setAddValue({ ...addValue, birthdate: e.target.value })}
          />
        </div>
      </form>
       {/* <form onSubmit={submitAddDataHandler}>
        <label for="profession" className="form-label">
        profession
        </label>
        <div className="form-group mx-3">
          <input
          maxLength={20}
            id="profession"
            type={"text"}
            className="form-control"
            placeholder="Enter worker profession"
            value={addValue.profession}
            onChange={(e) => setAddValue({ ...addValue, profession: e.target.value })}
          />
        </div>
      </form> */}
      <form onSubmit={submitAddDataHandler}>{/*post*/}
        <label for="post" className="form-label">
        post
        </label>
        <div className="form-group mx-3">
          <input
          maxLength={20}

            id="post"
            type={"text"}
            className="form-control"
            placeholder="Enter worker post"
            value={addValue.post}
            onChange={(e) => setAddValue({ ...addValue, post: e.target.value })}
          />
        </div>
      </form>
      {/* <form onSubmit={submitAddDataHandler}>
        <div className="form-group mx-3">
          <label for="name" className="form-label">
            name
          </label>
          
        </div>
      </form> */}
      <button className="btn btn-success mx-3" onClick={submitAddDataHandler}>
        Create Post
      </button>
    </div>
  );
};

export default CreateController;
