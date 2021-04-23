import React, { useContext } from "react";

import Icon from "../../components/Icon/Icon";
import Modal from "../../components/Modal/Modal";
import CartAccordion from "../../components/CartAccordion/CartAccordion";
import Icons from "../../img/icons.svg";

import { RecipeContext } from "../../context/recipe-context";

import "./CartModal.css";

const CartModal = () => {
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
  let price = Math.floor(Math.random() * 401) + 100;
  return state.cart.showModal ? (
    <Modal modalType="cart">
      <div className="cartModal">
        <ul className="cartModal__list cart__list">{cartList}</ul>
        <div className="cartModal__checkout">
          <h2 className="cartModal__total heading--2">Your Total:</h2>
          <div className="cartModal__price-details">
            <p className="cartModal__price">
              <span>Product charges:</span> <span> ₹{price}</span>
            </p>
            <p className="cartModal__tax">
              <span>Delivery charges:</span> <span>₹55.00</span>
            </p>
            <p className="cartModal__total-price">₹{price + 55}</p>
          </div>
          <button className="cartModal__btn btn--small">
            <span>Checkout</span>
            <Icon cl="cartModal__arrow-right-icon" name="triangle-right" />
          </button>
        </div>
      </div>
    </Modal>
  ) : null;
};
export default CartModal;
