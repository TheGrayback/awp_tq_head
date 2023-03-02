import React, { useContext } from "react";
import { AlertContext } from "../Context/Alert/AlertContext";

export const Alert = () => {
  const { alert, hide } = useContext(AlertContext);

  if (!alert.visible) {
    return null;
  }
  return (
    <div
      className={`alert alert-${
        alert.type || "warning"
      } alert-dismissible fade show`}
    >
      <strong>Warning!</strong>&nbsp;{alert.text}
      <button type="button" onClick={hide} className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};
