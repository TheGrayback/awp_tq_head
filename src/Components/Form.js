import React from "react";
// import { AlertContext } from "../Context/Alert/AlertContext";
// import { FirebaseContext } from "../Context/Firebase/firebaseContext";

export const Form = ({ filter, setFilter, sortOptions }) => {
  // const [addValue, setAddValue] = useState("");

  // const alert = useContext(AlertContext);
  // const firebase = useContext(FirebaseContext);

  // const submitAddNoteHandler = (event) => {
  //   event.preventDefault();
  //   if (addValue.trim()) {
  //     firebase
  //       .addNote(addValue.trim())
  //       .then(() => {
  //         alert.show("Created", "success");
  //       })
  //       .catch(() => {
  //         alert.show("Not created", "danger");
  //       });
  //     setAddValue(addValue);
  //   } else {
  //     alert.show("No note name!");
  //   }
  // };

  const searchBar = (event) => {
    event.preventDefault();
  };

  return (
    <div className="my-3">
      {/* <form onSubmit={submitAddNoteHandler}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter note name"
            value={addValue}
            onChange={(e) => setAddValue(e.target.value)}
          />
        </div>
      </form> */}
      {/*можно поменять онСабмит на онЧендж и наоборот. Наверное при огромном кол-ве записей онЧендж будет
      лагать. Или нет?*/}
      <form onSubmit={searchBar}>
        <div className="form-group mx-3">
          <input
            type={"text"}
            className="form-control"
            placeholder="Search note by"
            value={filter.searchQuery}
            onChange={(e) =>
              setFilter({ ...filter, searchQuery: e.target.value })
            }
          />
        </div>
      </form>
      <select
        className="form-select form-select-sm mx-3 w-25"
        value={filter.sortQuery}
        onChange={(e) => setFilter({ ...filter, sortQuery: e.target.value })}
      >
        <option disabled>Open this select menu</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
