import React from "react";

const DeleteButton = ({ WhatRemove }) => {
  return (
    <td>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={() => WhatRemove.removeFunction(WhatRemove.id)}
      >
        X
      </button>
    </td>
  );
};

export default DeleteButton;
