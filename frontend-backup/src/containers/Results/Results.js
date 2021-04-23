import React, { useContext } from "react";
import axios from "axios";
import { apiKey } from "../../temp";

import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";

import { RecipeContext } from "../../context/recipe-context";

import "./Results.css";
import ImageSmall from "../../components/ImageSmall/ImageSmall";

const Results = () => {
  const [state, setState] = useContext(RecipeContext);

  let resultList = null;

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

  if (state.recipes && state.totalResults !== 0) {
    const lastIndex = state.currentPage * state.recipesPerPage;
    const firstIndex = lastIndex - state.recipesPerPage;
    const currentRecipes = state.recipes.slice(firstIndex, lastIndex);

    resultList = currentRecipes.map((recipe) => {
      return (
        <li
          className="results__list-item"
          key={recipe.id}
          onClick={() => showRecipe(recipe.id)}
        >
          <a
            href={`#${recipe.title.toLowerCase().replaceAll(" ", "-")}`}
            className="results__link"
          >
            <ImageSmall Image={recipe.image} />
            <div className="results__data">
              <h4 className="results__title">
                <span className="results__title-span">{recipe.title}</span>
              </h4>
            </div>
          </a>
        </li>
      );
    });
  } else if (state.totalResults === 0) {
    resultList = (
      <li className="results__list-item">
        <div className="message">
          <p>No recipe found!</p>
        </div>
      </li>
    );
  }
  if (state.loading === true) {
    resultList = <Spinner />;
  }

  return (
    <div className="results">
      <ul className="results__list">{resultList}</ul>
      <Pagination
        recipesPerPage={state.recipesPerPage}
        totalRecipes={state.recipes ? state.recipes.length : 0}
      />
    </div>
  );
};
export default Results;
