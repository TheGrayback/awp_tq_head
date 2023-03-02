import React from "react";

const ChangeButton = ({ WhatEdit }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-info btn-sm"
      onClick={() => WhatEdit.editFunction(WhatEdit.id)}
    >
      Change
    </button>
  );
};

export default ChangeButton;
