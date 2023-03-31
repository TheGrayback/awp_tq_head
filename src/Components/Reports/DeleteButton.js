import React from "react";

const DeleteButton = ({ WhatRemove }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-danger btn-sm"
      onClick={() => WhatRemove.removeFunction(WhatRemove.id)}
    >
      X
    </button>
  );
};

export default DeleteButton;
