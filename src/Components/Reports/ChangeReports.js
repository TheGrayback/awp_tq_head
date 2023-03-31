import React, { useState, useContext } from "react";
import { ReportsFirebaseContext } from "../../Context/reportsFirebase/reportsFirebaseContext";
import { AlertContext } from "../../Context/Alert/AlertContext";

const ChangeReports = ({ setModalState, postId: postData }) => {
  const [changeValue, setChangeValue] = useState({
    u_id: "",
    surname: "",
    name: "",
  });
  const alert = useContext(AlertContext);
  const firebase = useContext(ReportsFirebaseContext);

  const submitChangeHandler = (event) => {
    event.preventDefault();
    if (changeValue) {
      firebase
        .changeData(postData.id, changeValue)
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
            placeholder={postData.u_id ? postData.u_id : "Change ID"}
            value={changeValue.u_id}
            onChange={(e) =>
              setChangeValue({ ...changeValue, u_id: e.target.value })
            }
          />
        </div>
      </form>
      <form onSubmit={submitChangeHandler}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder={postData.surname ? postData.surname : "Change surname"}
            value={changeValue.surname}
            onChange={(e) =>
              setChangeValue({ ...changeValue, surname: e.target.value })
            }
          />
        </div>
      </form>
      <form onSubmit={submitChangeHandler}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder={postData.name ? postData.name : "Change name"}
            value={changeValue.name}
            onChange={(e) =>
              setChangeValue({ ...changeValue, name: e.target.value })
            }
          />
        </div>
      </form>
      <button className="btn btn-success mx-3" onClick={submitChangeHandler}>
        Change Post
      </button>
    </div>
  );
};

export default ChangeReports;
