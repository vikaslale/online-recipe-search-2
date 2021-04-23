import React, { useContext } from "react";
import axios from "axios";
import { apiKey } from "../../temp";

import Icon from "../Icon/Icon";

import { RecipeContext } from "../../context/recipe-context";

import "./Search.css";

const Search = () => {
  const [state, setState] = useContext(RecipeContext);

  const searchRecipe = async (event) => {
    event.preventDefault();
    try {
      setState({ ...state, loading: true });
      const res = await axios({
        method: "GET",
        url: `/recipes/complexSearch?apiKey=${apiKey}&query=${event.target[0].value}&number=30`
      });

      setState({
        ...state,
        recipes: [...res.data.results],
        totalResults: res.data.totalResults,
        loading: false,
        currentPage: 1
      });
    } catch (err) {
      setState({
        ...state,
        error: {
          ...state.error,
          message: err.message,
          showModal: true
        }
      });
    }
  };

  return (
    <form className="form" onSubmit={(event) => searchRecipe(event)}>
      <input
        type="text"
        className="form__input"
        placeholder="Search for recipes....."
      />
      <button className="form__btn btn">
        <Icon cl="form__search-icon" name="magnifying-glass" />
        Search
      </button>
    </form>
  );
};
export default Search;
