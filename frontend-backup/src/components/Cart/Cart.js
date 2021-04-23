import React, { useContext } from "react";

import { RecipeContext } from "../../context/recipe-context";

import Icon from "../Icon/Icon";
import CartAccordion from "../CartAccordion/CartAccordion";
import Icons from "../../img/icons.svg";

import "./Cart.css";

const Cart = () => {
  const [state, setState] = useContext(RecipeContext);
  let cartList = [];

  const deleteIngredient = (key, index) => {
    const arrCopy = [...state.cart.cartItems[key].list];
    arrCopy.splice(index, 1);
    return setState({
      ...state,
      cart: {
        ...state.cart,
        cartItems: {
          ...state.cart.cartItems,
          [key]: {
            ...state.cart.cartItems[key],
            list: [...arrCopy]
          }
        }
      }
    });
  };

  const deleteList = (key) => {
    const objCopy = { ...state.cart.cartItems };
    let checkedRecipesArr = state.checkedRecipes.filter(
      (id) => parseInt(key) !== id
    );
    delete objCopy[key];

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
  };

  if (Object.keys(state.cart.cartItems).length !== 0) {
    for (const key in state.cart.cartItems) {
      cartList.push(
        <li className="cart__ingredient-item">
          <CartAccordion title={state.cart.cartItems[key].name}>
            {state.cart.cartItems[key].list.map((item, index) => {
              return (
                <li className="cart__ingredient-item" key={index}>
                  {item.name}
                  <svg
                    className="cross-icon"
                    onClick={() => deleteIngredient(key, index)}
                  >
                    <use href={`${Icons}#icon-circle-with-cross`} />
                  </svg>
                </li>
              );
            })}
          </CartAccordion>
          <svg
            className="cross-icon cross-icon__accordion"
            onClick={() => deleteList(key)}
          >
            <use href={`${Icons}#icon-circle-with-cross`} />
          </svg>
        </li>
      );
    }
  }

  const showCartModal = (type) => {
    switch (type) {
      case "cart":
        if (!state.modal) {
          return setState({
            ...state,
            modal: true,
            cart: {
              ...state.cart,
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

  return (
    <div className="cart">
      <div className="cart__field">
        <Icon cl="cart__shopping-cart-icon" name="shopping-cart" />
      </div>
      <div className="cart__panel">
        {Object.keys(state.cart.cartItems).length !== 0 ? (
          <ul className="cart__list">
            {cartList}
            {Object.keys(state.cart.cartItems).length !== 0 ? (
              <li>
                <button
                  className="cart__btn btn--small"
                  onClick={
                    state.login.isLoggedIn
                      ? () => showCartModal("cart")
                      : () => showCartModal("login")
                  }
                >
                  <span className="cart__button-span">Checkout</span>
                  <Icon cl="cart__arrow-right-icon" name="triangle-right" />
                </button>
              </li>
            ) : null}
          </ul>
        ) : (
          <p className="cart__text">Add some items in the cart!</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
