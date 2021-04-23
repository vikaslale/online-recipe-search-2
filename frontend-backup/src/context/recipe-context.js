import React, { createContext, useState } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = (props) => {
  const [state, setState] = useState({
    recipes: [],
    totalResults: null,
    loading: false,
    currentPage: 1,
    recipesPerPage: 10,
    recipeSelected: {
      data: null,
      isChecked: false,
      isFav: false,
      isRecipeSelected: false,
      isRecipeLoading: false
    },
    checkedRecipes: [],
    modal: false,
    cart: {
      cartItems: {},
      isCartLoaded: false,
      showModal: false
    },
    favourite: {
      favouriteItems: [],
      isfavouritesLoaded: false
    },
    login: {
      isLoggedIn: false,
      showModal: false
    },
    user: {
      token: "",
      id: "",
      name: "",
      email: "",
      photo: "",
      showModal: false
    },
    error: {
      message: "Something went wrong!",
      showModal: false
    }
  });

  return (
    <RecipeContext.Provider value={[state, setState]}>
      {props.children}
    </RecipeContext.Provider>
  );
};
