import React from "react";
import "../../styles/shared.scss";

const InfoContainer = ({ text }) => {
  return (
    <div className="info-container">
      <p>{text}</p>
    </div>
  );
};

export default InfoContainer;
