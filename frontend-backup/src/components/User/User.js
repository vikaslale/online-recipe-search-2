import React, { useContext } from "react";

import ImageSmall from "../ImageSmall/ImageSmall";

import { RecipeContext } from "../../context/recipe-context";

import { ReactComponent as UserIcon } from "../../img/user.svg";
import UserPlaceholder from "../../img/Portrait_Placeholder.png";
import "./User.css";

const User = () => {
  const [state, setState] = useContext(RecipeContext);

  const showUserModal = (type) => {
    switch (type) {
      case "user":
        if (!state.modal) {
          return setState({
            ...state,
            modal: true,
            user: {
              ...state.user,
              showModal: true
            }
          });
        }
        return;
      case "login":
        if (!state.modal) {
          return setState({
            ...state,
            modal: true,
            login: {
              ...state.login,
              showModal: true
            }
          });
        }
        return;

      default:
        return;
    }
  };

  const logOut = () => {
    localStorage.removeItem("userData");
    return setState({
      ...state,
      login: {
        ...state.login,
        isLoggedIn: false
      }
    });
  };

  return (
    <div className="user">
      <div className="user__field">
        <UserIcon className="user__user-icon" />
      </div>
      <div className="user__panel">
        {state.login.isLoggedIn ? (
          <React.Fragment>
            <div className="user__image">
              <ImageSmall
                Image={
                  state.user.photo
                    ? `http://localhost:5500/img/${state.user.photo}`
                    : UserPlaceholder
                }
              />
              <p className="user__image-caption">
                <span>{state.user.name}</span>
                <span>{state.user.email}</span>
              </p>
            </div>
            <button
              className="btn--inline user__edit-profile"
              onClick={() => showUserModal("user")}
            >
              Edit profile
            </button>
            <button className="btn--inline" onClick={logOut}>
              Logout
            </button>
          </React.Fragment>
        ) : (
          <button
            className="btn--inline"
            onClick={() => showUserModal("login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
export default User;
