import React from "react";

import "./ImageSmall.css";

const ImageSmall = (props) => {
  return (
    <figure className="imageSmall__figure">
      <img src={props.Image} alt="Result" />
    </figure>
  );
};
export default ImageSmall;
