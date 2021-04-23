import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import Icon from "../../components/Icon/Icon";
import Spinner from "../../components/Spinner/Spinner";

import { RecipeContext } from "../../context/recipe-context";

import { ReactComponent as RecipeBookIcon } from "../../img/recipe-book.svg";
import "./Recipe.css";

const Recipe = () => {
  const [state, setState] = useContext(RecipeContext);
  const [cartIcon, setCartIcon] = useState("shopping-cart-outlined");
  const [heartIcon, setHeartIcon] = useState("heart-outlined");

  let ingredients = [];

  useEffect(() => {
    if (state.recipeSelected.data) {
      let recipeId = state.checkedRecipes.find(
        (id) => state.recipeSelected.data.id === id
      );
      if (recipeId) {
        setState((prevState) => {
          return {
            ...prevState,
            recipeSelected: {
              ...prevState.recipeSelected,
              isChecked: true
            }
          };
        });
        setCartIcon("shopping-cart");
      } else {
        setState((prevState) => {
          return {
            ...prevState,
            recipeSelected: {
              ...prevState.recipeSelected,
              isChecked: false
            }
          };
        });
        setCartIcon("shopping-cart-outlined");
      }
    }
  }, [state.checkedRecipes, state.recipeSelected.data, setState]);

  useEffect(() => {
    if (state.recipeSelected.data) {
      let fav = state.favourite.favouriteItems.find((el) => {
        return state.recipeSelected.data.id === el.recipeId;
      });
      if (fav) {
        setState((prevState) => {
          return {
            ...prevState,
            recipeSelected: {
              ...prevState.recipeSelected,
              isFav: true
            }
          };
        });
        setHeartIcon("heart");
      } else {
        setState((prevState) => {
          return {
            ...prevState,
            recipeSelected: {
              ...prevState.recipeSelected,
              isFav: false
            }
          };
        });
        setHeartIcon("heart-outlined");
      }
    }
  }, [state.favourite.favouriteItems, state.recipeSelected.data, setState]);

  const addToFav = async () => {
    if (state.recipeSelected.isFav === true) {
      const arrCopy = [...state.favourite.favouriteItems];
      arrCopy.forEach(async (el, i) => {
        if (el.recipeId === state.recipeSelected.data.id) {
          try {
            arrCopy.splice(i, 1);
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
        }
      });
    } else {
      try {
        const res = await axios({
          method: "PATCH",
          url: "http://localhost:5500/api/users/updatefav",
          data: {
            recipeId: state.recipeSelected.data.id,
            name: state.recipeSelected.data.title,
            imageUrl: state.recipeSelected.data.image
          },
          headers: {
            authorization: `Bearer ${state.user.token}`
          }
        });

        setState({
          ...state,
          recipeSelected: {
            ...state.recipeSelected,
            isFav: true
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
    }
  };
  const addToCart = () => {
    if (state.recipeSelected.isChecked === true) {
      const objCopy = { ...state.cart.cartItems };

      for (const key in objCopy) {
        if (parseInt(key) === state.recipeSelected.data.id) {
          delete objCopy[key];

          let checkedRecipesArr = state.checkedRecipes.filter(
            (id) => id !== state.recipeSelected.data.id
          );

          setState({
            ...state,
            recipeSelected: {
              ...state.recipeSelected,
              isChecked: false
            },
            checkedRecipes: [...checkedRecipesArr],
            cart: {
              ...state.cart,
              cartItems: { ...objCopy }
            }
          });
          let local = { ...JSON.parse(localStorage.getItem("userData")) };
          local = {
            ...local,
            checkedRecipesList: [...checkedRecipesArr],
            cartItems: {
              ...objCopy
            }
          };
          localStorage.setItem("userData", JSON.stringify({ ...local }));
        }
      }
    } else {
      const objCopy = {
        ...state.cart.cartItems,
        [state.recipeSelected.data.id]: {
          ...state.cart.cartItems[state.recipeSelected.data.id],
          name: state.recipeSelected.data.title,
          list: [...state.recipeSelected.data.extendedIngredients]
        }
      };
      let arr = [...state.checkedRecipes, state.recipeSelected.data.id];
      setState({
        ...state,
        recipeSelected: {
          ...state.recipeSelected,
          isChecked: true
        },
        checkedRecipes: [...arr],
        cart: {
          ...state.cart,
          cartItems: { ...objCopy }
        }
      });
      let local = { ...JSON.parse(localStorage.getItem("userData")) };
      local = {
        ...local,
        checkedRecipesList: [...arr],
        cartItems: {
          ...objCopy
        }
      };
      localStorage.setItem("userData", JSON.stringify({ ...local }));
    }
  };

  if (state.recipeSelected.isRecipeSelected) {
    state.recipeSelected.data.extendedIngredients.map((ingredient) => {
      return ingredients.push(
        <li className="recipe__ingredient-item">
          <Icon cl="check-icon" name="check" />
          <div className="recipe__ingredient-amount">
            {ingredient.amount.toFixed(1)}
          </div>
          <div className="recipe__ingredient-name">
            <span className="recipe__ingredient-unit">
              {ingredient.unit} {ingredient.name}
            </span>
          </div>
        </li>
      );
    });
  }

  let currentRecipe;

  if (state.recipeSelected.isRecipeLoading === true) {
    currentRecipe = <Spinner />;
  } else {
    currentRecipe = state.recipeSelected.data ? (
      <React.Fragment>
        <figure className="recipe__fig">
          <img
            src={state.recipeSelected.data.image}
            alt="Recipe"
            className="recipe__img"
          />
          <h1 className="recipe__title">
            <span>{state.recipeSelected.data.title}</span>
          </h1>
        </figure>
        <div className="recipe__detail">
          <div className="recipe__info">
            <Icon cl="recipe__info-icon" name="stopwatch" />
            <span className="recipe__info-data recipe__info-data--minutes">
              {state.recipeSelected.data.readyInMinutes}
            </span>
            <span className="recipe__info-text">minutes</span>
          </div>
          <div className="recipe__info">
            <Icon cl="recipe__info-icon" name="man" />
            <span className="recipe__info-data recipe__info-data--people">
              {state.recipeSelected.data.servings}
            </span>
            <span className="recipe__info-text">servings</span>
            <div className="recipe__info-buttons">
              <button className="btn--tiny btn--update-servings">
                <Icon cl="minus-icon" name="circle-with-minus" />
              </button>
              <button className="btn--tiny btn--update-servings">
                <Icon cl="plus-icon" name="circle-with-plus" />
              </button>
            </div>
          </div>
          <div className="recipe_heart-cart-icon">
            <button
              className="btn--round btn--heart-outlined"
              onClick={addToFav}
            >
              <Icon cl="recipe__heart-outlined-icon" name={heartIcon} />
            </button>
            <button
              className="btn--round btn--shopping-cart"
              onClick={addToCart}
            >
              <Icon cl="recipe__shopping-cart-outlined-icon" name={cartIcon} />
            </button>
          </div>
        </div>
        <div className="recipe__ingredients">
          <h2 className="heading--2">Recipe ingredients</h2>
          <ul className="recipe__ingredient-list">{ingredients}</ul>
        </div>
        <div className="recipe__direction">
          <h2 className="heading--2">How to cook it</h2>
          <p className="recipe__direction-text">
            This recipe is made by{" "}
            <strong>{state.recipeSelected.data.creditsText}</strong>. Visit
            their website for directions.
          </p>
          <a
            href={state.recipeSelected.data.sourceUrl}
            className="btn--small recipe__btn"
          >
            <span>Directions</span>
            <Icon cl="recipe__arrow-right-icon" name="triangle-right" />
          </a>
        </div>
      </React.Fragment>
    ) : (
      <div className="message">
        <RecipeBookIcon className="message__icon" />
        <p>Search for some recipes!</p>
      </div>
    );
  }

  return <div className="recipe">{currentRecipe}</div>;
};
export default Recipe;
