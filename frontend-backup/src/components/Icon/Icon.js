import React from "react";

import Icons from "../../img/icons.svg";

const Icon = (props) => {
  return (
    <svg className={`${props.cl}`}>
      <use href={`${Icons}#icon-${props.name}`} />
    </svg>
  );
};
export default Icon;
