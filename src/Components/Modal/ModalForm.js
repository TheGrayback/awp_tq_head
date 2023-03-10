import React from "react";
import modalView from "./ModalForm.module.css";

const ModalForm = ({ children, isVisible, setVisible }) => {
  const rootClasses = [modalView.modal];
  if (isVisible) {
    rootClasses.push(modalView.modalActive);
  }
  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={modalView.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalForm;
