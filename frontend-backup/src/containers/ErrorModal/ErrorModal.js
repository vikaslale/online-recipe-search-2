import React, { useContext } from "react";

import { RecipeContext } from "../../context/recipe-context";

import { ReactComponent as ErrorIcon } from "../../img/warning.svg";
import { ReactComponent as CloseSvg } from "../../img/close.svg";
import "./ErrorModal.css";

const ErrorModal = () => {
  const [state, setState] = useContext(RecipeContext);

  const closeErrorModal = () => {
    setState({
      ...state,
      error: {
        ...state.error,
        showModal: false
      }
    });
  };

  return state.error.showModal ? (
    <div className="error__modal">
      <div className="errorModal__content">
        <CloseSvg className="modal__close" onClick={closeErrorModal} />
        <div className="error__message">
          <ErrorIcon className="error__icon" />
          <p>{state.error.message}</p>
        </div>
      </div>
    </div>
  ) : null;
};
export default ErrorModal;
