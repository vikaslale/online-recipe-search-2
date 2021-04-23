import React from "react";

import Results from "../Results/Results";
import Recipe from "../Recipe/Recipe";

import "./Content.css";

const Content = () => {
  return (
    <div className="content">
      <Results />
      <Recipe />
    </div>
  );
};
export default Content;
