import React, { useContext, useState } from "react";
import axios from "axios";

import Modal from "../../components/Modal/Modal";

import { RecipeContext } from "../../context/recipe-context";

import "./LoginModal.css";

const LoginModal = () => {
  const [state, setState] = useContext(RecipeContext);
  const [Auth, setAuth] = useState({
    isLogin: true,
    isSignUp: false
  });
  const [value, setValue] = useState({
    emailLogin: "",
    passwordLogin: "",
    nameSignUp: "",
    emailSignUp: "",
    passwordSignUp: "",
    passwordConfirmSignUp: ""
  });

  const updateAuth = (type) => {
    if (type === "signup") {
      return setAuth({ ...Auth, isLogin: false, isSignUp: true });
    } else if (type === "login") {
      return setAuth({ ...Auth, isLogin: true, isSignUp: false });
    }
  };

  const authenticateUser = async (event, type) => {
    event.preventDefault();
    if (type === "signup") {
      const data = new FormData(event.target);

      if (
        data.get("login_password_signup") !==
        data.get("login_password_signup_confirm")
      ) {
        return alert("passwords don't match!!");
      }

      try {
        const res = await axios({
          method: "POST",
          url: "http://localhost:5500/api/users/signup",
          data: {
            name: data.get("login_name_signup"),
            email: data.get("login_email_signup"),
            password: data.get("login_password_signup")
          }
        });

        let userData = res.data;
        let favArr = [...userData.data.user.favourites];
        setState({
          ...state,
          modal: false,
          favourite: {
            ...state.favourite,
            favouriteItems: [...favArr]
          },
          login: {
            ...state.login,
            isLoggedIn: true,
            showModal: false
          },
          user: {
            ...state.user,
            token: userData.token,
            id: userData.data.user._id,
            name: userData.data.user.name,
            email: userData.data.user.email,
            photo: userData.data.user.photo
          }
        });
        localStorage.setItem(
          "userData",
          JSON.stringify({
            token: userData.token,
            id: userData.data.user._id,
            name: userData.data.user.name,
            email: userData.data.user.email,
            photo: userData.data.user.photo,
            favourite: {
              favouriteItems: [...favArr]
            }
          })
        );
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
    } else {
      const data = new FormData(event.target);
      try {
        const res = await axios({
          method: "POST",
          url: "http://localhost:5500/api/users/login",
          data: {
            email: data.get("login_email"),
            password: data.get("login_password")
          }
        });
        let userData = res.data;
        let favArr = [...userData.data.user.favourites];
        setState({
          ...state,
          modal: false,
          favourite: {
            ...state.favourite,
            favouriteItems: [...favArr]
          },
          login: {
            ...state.login,
            isLoggedIn: true,
            showModal: false
          },
          user: {
            ...state.user,
            token: userData.token,
            id: userData.data.user._id,
            name: userData.data.user.name,
            email: userData.data.user.email,
            photo: userData.data.user.photo
          }
        });
        localStorage.setItem(
          "userData",
          JSON.stringify({
            token: userData.token,
            id: userData.data.user._id,
            name: userData.data.user.name,
            email: userData.data.user.email,
            photo: userData.data.user.photo,
            favourite: {
              favouriteItems: [...favArr]
            }
          })
        );
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
    }
  };

  let auth = null;
  if (Auth.isLogin && !Auth.isSignUp) {
    auth = (
      <form
        className="loginModal__form"
        onSubmit={(event) => authenticateUser(event, "login")}
      >
        <input
          type="email"
          id="login_email"
          name="login_email"
          required
          placeholder="Email"
          value={value.emailLogin}
          onChange={(event) =>
            setValue({
              ...value,
              emailLogin: event.target.value
            })
          }
        />
        <input
          type="password"
          id="login_password"
          name="login_password"
          placeholder="Password"
          required
          value={value.passwordLogin}
          onChange={(event) =>
            setValue({
              ...value,
              passwordLogin: event.target.value
            })
          }
        />
        <div className="userModal__form-buttons">
          <p className="userModal__signup-text">
            Don't have an account?{" "}
            <a href="#signup" onClick={() => updateAuth("signup")}>
              Sign up here
            </a>
          </p>
          <button className="loginModal__form-btn btn--inline">Login</button>
        </div>
      </form>
    );
  } else if (Auth.isSignUp && !Auth.isLogin) {
    auth = (
      <form
        className="loginModal__form"
        onSubmit={(event) => authenticateUser(event, "signup")}
      >
        <input
          type="text"
          id="login_name_signup"
          name="login_name_signup"
          required
          placeholder="Full Name"
          value={value.nameSignUp}
          onChange={(event) =>
            setValue({
              ...value,
              nameSignUp: event.target.value
            })
          }
        />
        <input
          type="email"
          id="login_email_signup"
          name="login_email_signup"
          placeholder="Email"
          required
          value={value.emailSignUp}
          onChange={(event) =>
            setValue({
              ...value,
              emailSignUp: event.target.value
            })
          }
        />
        <input
          type="password"
          id="login_password_signup"
          name="login_password_signup"
          required
          placeholder="Password"
          value={value.passwordSignUp}
          onChange={(event) =>
            setValue({
              ...value,
              passwordSignUp: event.target.value
            })
          }
        />
        <input
          type="password"
          id="login_password_signup_confirm"
          name="login_password_signup_confirm"
          required
          placeholder="Confirm password"
          value={value.passwordConfirmSignUp}
          onChange={(event) =>
            setValue({
              ...value,
              passwordConfirmSignUp: event.target.value
            })
          }
        />
        <div className="userModal__form-buttons">
          <p className="userModal__signup-text">
            Already have an account?{" "}
            <a href="#login" onClick={() => updateAuth("login")}>
              Login here
            </a>
          </p>
          <button className="loginModal__form-btn btn--inline">Sign up</button>
        </div>
      </form>
    );
  }

  return state.login.showModal ? (
    <Modal modalType="login">
      <div className="loginModal">{auth}</div>
    </Modal>
  ) : null;
};
export default LoginModal;
