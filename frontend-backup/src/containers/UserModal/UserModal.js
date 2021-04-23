import axios from "axios";
import React, { useContext, useState } from "react";

import Modal from "../../components/Modal/Modal";

import { RecipeContext } from "../../context/recipe-context";

import UserPlaceholder from "../../img/Portrait_Placeholder.png";
import "./UserModal.css";

const UserModal = () => {
  const [state, setState] = useContext(RecipeContext);
  const [userPassword, setUserPassword] = useState({
    select: false,
    passwordCurrent: "",
    password: "",
    passwordConfirm: ""
  });

  const updateData = (event, value) => {
    switch (value) {
      case "name":
        return setState({
          ...state,
          user: {
            ...state.user,
            name: event.target.value
          }
        });

      case "email":
        return setState({
          ...state,
          user: {
            ...state.user,
            email: event.target.value
          }
        });

      case "password-current":
        return setUserPassword({
          ...userPassword,
          passwordCurrent: event.target.value
        });
      case "password":
        return setUserPassword({
          ...userPassword,
          password: event.target.value
        });

      case "password-confirm":
        return setUserPassword({
          ...userPassword,
          passwordConfirm: event.target.value
        });
      default:
        return;
    }
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    if (userPassword.password !== userPassword.passwordConfirm) {
      return alert("passwords don't match!!");
    }

    try {
      const res = await axios({
        method: "PATCH",
        url: "http://localhost:5500/api/users/updatepassword",
        data: {
          passwordCurrent: data.get("password-current"),
          password: data.get("password")
        },
        headers: {
          authorization: `Bearer ${state.user.token}`
        }
      });
      if (res.data.status === "success") {
        setState({
          ...state,
          modal: false,
          login: {
            ...state.login,
            showModal: false
          }
        });
      }
    } catch (err) {
      if (err.response) {
        setState({
          ...state,
          error: {
            ...state.error,
            message: err.response.data.message,
            showModal: true
          }
        });
      } else {
        setState({
          ...state,
          error: {
            ...state.error,
            message: err.message,
            showModal: true
          }
        });
      }
    }
  };

  const changePhoto = async (event) => {
    try {
      const formData = new FormData();
      formData.append("photo", event.target.files[0]);
      const res = await axios({
        method: "PATCH",
        url: "http://localhost:5500/api/users/updateuser",
        data: formData,
        headers: {
          authorization: `Bearer ${state.user.token}`
        }
      });
      setState({
        ...state,
        user: {
          ...state.user,
          photo: res.data.data.user.photo
        }
      });
      let loggedUser = JSON.parse(localStorage.getItem("userData"));
      loggedUser = {
        ...loggedUser,
        photo: res.data.data.user.photo
      };
      localStorage.setItem("userData", JSON.stringify(loggedUser));
    } catch (err) {
      if (err.response) {
        setState({
          ...state,
          error: {
            ...state.error,
            message: err.response.data.message,
            showModal: true
          }
        });
      } else {
        setState({
          ...state,
          error: {
            ...state.error,
            message: err.message,
            showModal: true
          }
        });
      }
    }
  };

  const changeData = (type) => {
    if (type === "password") {
      return setUserPassword({
        ...userPassword,
        select: true
      });
    }
    return setUserPassword({
      ...userPassword,
      select: false
    });
  };

  return state.user.showModal ? (
    <Modal modalType="user">
      <div className="userModal">
        <div className="userModal__image">
          <figure className="userModal__figure">
            <img
              src={
                state.user.photo
                  ? `http://localhost:5500/img/${state.user.photo}`
                  : UserPlaceholder
              }
              alt="Result"
            />
          </figure>
        </div>
        {userPassword.select ? (
          <form
            className="userModal__form"
            onSubmit={(event) => updatePassword(event)}
          >
            <label htmlFor="password">Current Password: </label>
            <input
              type="password"
              name="password-current"
              id="password-current"
              value={userPassword.passwordCurrent}
              required
              onChange={(event) => updateData(event, "password-current")}
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={userPassword.password}
              required
              onChange={(event) => updateData(event, "password")}
            />
            <label htmlFor="password-confirm">Confirm password: </label>
            <input
              type="password"
              name="password-confirm"
              id="password-confirm"
              value={userPassword.passwordConfirm}
              required
              onChange={(event) => updateData(event, "password-confirm")}
            />
            <div className="userModal__form-buttons">
              <button className="userModal__form-btn btn" onClick={changeData}>
                Change Details
              </button>
              <button className="userModal__form-btn btn">Submit</button>
            </div>
          </form>
        ) : (
          <form className="userModal__form" action="#">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              value={state.user.name}
              onChange={(event) => updateData(event, "name")}
              name="name"
              id="name"
              required
            />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              value={state.user.email}
              onChange={(event) => updateData(event, "email")}
              name="email"
              id="email"
              required
            />
            <div className="userModal__form-buttons">
              <label htmlFor="photo" className="btn">
                Change photo
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={(event) => changePhoto(event)}
              />
              <button
                className="userModal__form-btn btn"
                onClick={() => changeData("password")}
              >
                Change Password
              </button>
              <button className="userModal__form-btn btn">Submit</button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  ) : null;
};
export default UserModal;
