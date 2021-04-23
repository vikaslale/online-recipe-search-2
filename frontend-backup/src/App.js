import { useContext, useEffect } from "react";

import Header from "./containers/Header/Header";
import Content from "./containers/Content/Content";
import CartModal from "./containers/CartModal/CartModal";
import UserModal from "./containers/UserModal/UserModal";
import LoginModal from "./containers/LoginModal/LoginModal";
import ErrorModal from "./containers/ErrorModal/ErrorModal";

import { RecipeContext } from "./context/recipe-context";

import "./App.css";

function App() {
  const [state, setState] = useContext(RecipeContext);

  useEffect(() => {
    const loggedUser = localStorage.getItem("userData");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      let arr = [];
      if (user.checkedRecipesList) {
        arr = [...user.checkedRecipesList];
      }
      let favArr = [];
      if (user.favourite) {
        favArr = [...user.favourite.favouriteItems];
      }
      setState((prevState) => {
        return {
          ...prevState,
          checkedRecipes: [...prevState.checkedRecipes, ...arr],
          cart: {
            ...prevState.cart,
            cartItems: {
              ...prevState.cart.cartItems,
              ...user.cartItems
            }
          },
          favourite: {
            ...prevState.favourite,
            favouriteItems: [...favArr]
          },
          login: {
            ...prevState.login,
            isLoggedIn: true
          },
          user: {
            ...prevState.user,
            token: user.token,
            id: user.id,
            name: user.name,
            email: user.email,
            photo: user.photo
          }
        };
      });
    }
  }, [setState]);

  return (
    <div className="App">
      <Header />
      <Content />
      <CartModal />
      <UserModal />
      <LoginModal />
      <ErrorModal />
    </div>
  );
}

export default App;
