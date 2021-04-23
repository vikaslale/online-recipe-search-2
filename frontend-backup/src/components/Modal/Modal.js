import React, { useContext } from "react";

import { RecipeContext } from "../../context/recipe-context";

import { ReactComponent as CloseSvg } from "../../img/close.svg";
import "./Modal.css";

const Modal = (props) => {
  const [state, setState] = useContext(RecipeContext);

  const closeModal = (modalType) => {
    switch (modalType) {
      case "cart":
        return setState({
          ...state,
          modal: false,
          cart: {
            ...state.cart,
            showModal: false
          }
        });

      case "user":
        return setState({
          ...state,
          modal: false,
          user: {
            ...state.user,
            showModal: false
          }
        });

      case "login":
        return setState({
          ...state,
          modal: false,
          login: {
            ...state.login,
            showModal: false
          }
        });

      case "error":
        return setState({
          ...state,
          modal: false,
          error: {
            ...state.error,
            showModal: false
          }
        });
      default:
        break;
    }
  };

  return state.modal ? (
    <div className="modal">
      <div className="modal__content">
        <CloseSvg
          className="modal__close"
          onClick={(event) => closeModal(props.modalType)}
        />
        {props.children}
      </div>
    </div>
  ) : null;
};
export default Modal;
