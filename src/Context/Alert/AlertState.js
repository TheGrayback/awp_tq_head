import React, { useReducer } from "react";
import { ShowAlert, HideAlert } from "../types";
import { AlertContext } from "./AlertContext";
import AlertReducer from "./AlertReducer";

const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, { visible: false });
  const show = (text, type = "warning") => {
    dispatch({
      type: ShowAlert,
      payload: { text, type },
    });
  };

  const hide = () => dispatch({ type: HideAlert });
  return (
    <AlertContext.Provider value={{ show, hide, alert: state }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
