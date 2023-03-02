import React from "react";

const ChangeButton = ({ WhatEdit }) => {
  return (
    <td>
      <button
        type="button"
        className="btn btn-outline-info btn-sm"
        onClick={() => WhatEdit.editFunction(WhatEdit.id)}
      >
        Change
      </button>
    </td>
  );
};

export default ChangeButton;
