import React from "react";

const ChangeButton = ({ setChangeVisible, setPostId, currentData }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-info btn-sm"
      onClick={() => {
        setChangeVisible(true);
        setPostId(currentData);
      }}
    >
      Change
    </button>
  );
};

export default ChangeButton;
