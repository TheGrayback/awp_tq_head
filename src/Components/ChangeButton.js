import React from "react";

const ChangeButton = ({ setChangeVisible, setPostId, id }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-info btn-sm"
      onClick={() => {
        setChangeVisible(true);
        setPostId(id);
        console.log(id);
      }}
    >
      Change
    </button>
  );
};

export default ChangeButton;
