import React, { useContext } from "react";

import Icon from "../../components/Icon/Icon";

import { RecipeContext } from "../../context/recipe-context";

const Pagination = (props) => {
  const [state, setState] = useContext(RecipeContext);

  const totalPages =
    props.totalRecipes > 0
      ? Math.ceil(props.totalRecipes / props.recipesPerPage)
      : 0;

  const nextPage = (currentPage) => {
    if (currentPage < totalPages) {
      return setState({ ...state, currentPage: currentPage + 1 });
    }
    return;
  };

  const prevPage = (currentPage) => {
    if (currentPage > 1) {
      return setState({ ...state, currentPage: currentPage - 1 });
    }
    return;
  };

  return (
    <div className="results__pagination">
      {state.currentPage === 1 || totalPages === 0 ? null : (
        <button
          className="btn--inline results__pagination-button btn-prev"
          onClick={() => prevPage(state.currentPage)}
        >
          <Icon cl="results__pagination-arrow-left-icon" name="triangle-left" />
          <span>Page {state.currentPage - 1}</span>
        </button>
      )}

      {state.currentPage === totalPages || totalPages === 0 ? null : (
        <button
          className="btn--inline results__pagination-button btn-next"
          onClick={() => nextPage(state.currentPage)}
        >
          <span>Page {state.currentPage + 1}</span>
          <Icon
            cl="results__pagination-arrow-right-icon"
            name="triangle-right"
          />
        </button>
      )}
    </div>
  );
};
export default Pagination;
