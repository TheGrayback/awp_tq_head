import React from "react";
// import { AlertContext } from "../Context/Alert/AlertContext";
// import { FirebaseContext } from "../Context/Firebase/firebaseContext";

export const SearchForm = ({ filter, setFilter, sortOptions }) => {
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

  /*можно поменять онСабмит на онЧендж и наоборот. Наверное при огромном кол-ве записей онЧендж будет
      лагать. Или нет?*/
  return (
    <div className="my-3">
      <div className="input-group w-75 mx-auto">
        {/* <input
          type={"text"}
          className="form-control w-50"
          placeholder="Search note by"
          value={filter.searchQuery}
          onChange={(e) =>
            setFilter({ ...filter, searchQuery: e.target.value })
          }
        /> */}
        {/* <select
          className="form-select"
          value={filter.searchKey}
          onChange={(e) => setFilter({ ...filter, searchKey: e.target.value })}
        >
          <option disabled>Open this select menu</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select> */}
      </div>

      <form className="mx-3 my-3">
        <label for="sort" className="form-label">
          Сортування
        </label>
        <div>
          <select
            id="sort"
            className="form-select form-select-sm w-25"
            value={filter.sortQuery}
            onChange={(e) =>
              setFilter({ ...filter, sortQuery: e.target.value })
            }
          >
            <option disabled>Open this select menu</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};
