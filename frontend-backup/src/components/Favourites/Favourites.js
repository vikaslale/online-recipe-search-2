import React, { useContext } from "react";
import axios from "axios";
import { apiKey } from "../../temp";

import Icon from "../Icon/Icon";

import { RecipeContext } from "../../context/recipe-context";

import "./Favourites.css";
import Icons from "../../img/icons.svg";
import ImageSmall from "../ImageSmall/ImageSmall";

const Favourites = () => {
  const [state, setState] = useContext(RecipeContext);
  const showLoginModal = () => {
    return setState({
      ...state,
      modal: true,
      login: {
        ...state.login,
        isLoggedIn: true,
        showModal: true
      }
    });
  };

  const showRecipe = async (recipeId) => {
    try {
      setState({
        ...state,
        recipeSelected: {
          ...state.recipeSelected,
          isRecipeLoading: true
        }
      });
      const res = await axios({
        method: "GET",
        url: `/recipes/${recipeId}/information?apiKey=${apiKey}`
      });

      setState({
        ...state,
        recipeSelected: {
          ...state.recipeSelected,
          data: { ...res.data },
          isRecipeSelected: true,
          isRecipeLoading: false
        }
      });
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
  const deleteFav = async (index) => {
    let arrCopy = [...state.favourite.favouriteItems];
    try {
      arrCopy.splice(index, 1);
      const res = await axios({
        method: "PATCH",
        url: "http://localhost:5500/api/users/removefav",
        data: {
          fav: [...arrCopy]
        },
        headers: {
          authorization: `Bearer ${state.user.token}`
        }
      });
      setState({
        ...state,
        recipeSelected: {
          ...state.recipeSelected,
          isFav: false
        },
        favourite: {
          ...state.favourite,
          favouriteItems: [...res.data.data.favourites]
        }
      });

      let local = { ...JSON.parse(localStorage.getItem("userData")) };
      local = {
        ...local,
        favourite: {
          favouriteItems: [...res.data.data.favourites]
        }
      };
      localStorage.setItem("userData", JSON.stringify({ ...local }));
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

  return (
    <div className="favourites">
      <div className="favourites__field">
        <Icon cl="favourites__heart-icon" name="heart" />
      </div>

      <div className="favourites__panel">
        {state.login.isLoggedIn ? (
          <ul className="favourites__list">
            {state.favourite.favouriteItems.map((fav, index) => {
              return (
                <li className="favourites__list-item" key={fav.recipeId}>
                  <a
                    href={`#${fav.name.toLowerCase().replaceAll(" ", "-")}`}
                    className="favourites__link"
                    onClick={() => showRecipe(fav.recipeId)}
                  >
                    <ImageSmall Image={fav.imageUrl} />
                    <div className="favourites__data">
                      <h1 className="favourites__title">{fav.name}</h1>
                    </div>
                  </a>
                  <svg className="cross-icon" onClick={() => deleteFav(index)}>
                    <use href={`${Icons}#icon-circle-with-cross`} />
                  </svg>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="favourites__login">
            <p>Please login to see your favourites!</p>
            <button
              className="btn--inline"
              onClick={() => showLoginModal("login")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Favourites;
