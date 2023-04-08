import React, { useState, useContext,useMemo } from "react";
import { FirebaseContext } from "../../Context/Firebase/controllersFirebaseContext";
import { AlertContext } from "../../Context/Alert/AlertContext";

const ChangeController = ({ isVisible, setModalState, postId: postData }) => {
  const [changeValue, setChangeValue] = useState({
    u_id: postData.u_id,
    surname: postData.surname,
    name: postData.name,
    patronymic: postData.patronymic,
    birthdate: postData.birthdate,
    // profession: postData.profession,
    post: postData.post,
  });

  useMemo(() => {
    if(isVisible === true) {
      setChangeValue(postData);
    }
  },[postData, isVisible])

  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  function checkObjectProperties(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop) && obj[prop].trim() === "") {
        return false; // Если свойство пустое, возвращаем false
      }
    }
    return true; // Если все свойства заполнены, возвращаем true
  }

  const submitChangeHandler = (event) => {
    event.preventDefault();
    if (checkObjectProperties(changeValue)) {
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
      <form onSubmit={submitChangeHandler}> {/*U_ID*/}
        <div className="form-group mx-3">
          <label for="u_id" className="form-label">
            U_ID
          </label>
          <input
          maxLength={20}
            id="u_id"
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
      <form onSubmit={submitChangeHandler}>{/*Full name*/}
        <label for="surname" className="form-label">
          Full name
        </label>
        <div className="form-group input-group mx-3">
          <input
          maxLength={20}
            id="surname"
            type={"text"}
            className="form-control"
            placeholder={postData.surname ? postData.surname : "Change surname"}
            value={changeValue.surname}
            onChange={(e) =>
              setChangeValue({ ...changeValue, surname: e.target.value })
            }
          />
          <input
          maxLength={20}
            type={"text"}
            className="form-control"
            placeholder={postData.name ? postData.name : "Change name"}
            value={changeValue.name}
            onChange={(e) =>
              setChangeValue({ ...changeValue, name: e.target.value })
            }
          />
          <input
          maxLength={20}
            type={"text"}
            className="form-control"
            placeholder={postData.patronymic ? postData.patronymic : "Change patronymic"}
            value={changeValue.patronymic}
            onChange={(e) =>
              setChangeValue({ ...changeValue, patronymic: e.target.value })
            }
          />
        </div>
      </form>
      <form onSubmit={submitChangeHandler}>{/*birthdate*/}
        <label for="birthdate" className="form-label">
          birthdate
        </label>
        <div className="form-group mx-3">
          <input
            id="birthdate"
            type={"date"}
            className="form-control"
            placeholder={postData.birthdate ? postData.birthdate : "Change birthday"}
            value={changeValue.birthdate}
            onChange={(e) =>
              setChangeValue({ ...changeValue, birthdate: e.target.value })
            }
          />
        </div>
      </form>
      {/* <form onSubmit={submitChangeHandler}>
        <label for="profession" className="form-label">
          profession
        </label>
        <div className="form-group mx-3">
          <input
          maxLength={20}
            id="profession"
            type={"text"}
            className="form-control"
            placeholder={postData.profession ? postData.profession : "Change profession"}
            value={changeValue.profession}
            onChange={(e) =>
              setChangeValue({ ...changeValue, profession: e.target.value })
            }
          />
        </div>
      </form> */}
      <form onSubmit={submitChangeHandler}>{/*post*/}
        <label for="post" className="form-label">
          post
        </label>
        <div className="form-group mx-3">
          <input
          maxLength={20}
            id="post"
            type={"text"}
            className="form-control"
            placeholder={postData.post ? postData.post : "Change post"}
            value={changeValue.post}
            onChange={(e) =>
              setChangeValue({ ...changeValue, post: e.target.value })
            }
          />
        </div>
      </form>
      <br></br>
      <button className="btn btn-success mx-3" onClick={submitChangeHandler}>
        Change Post
      </button>
    </div>
  );
};

export default ChangeController;
