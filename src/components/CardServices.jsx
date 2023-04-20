import React from "react";
import "../styles/CardServices.scss";

const CardServices = (props) => {
  const { backgroundImage, description } = props;

  const backgroundImageSlider = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(128, 211, 187, 0.4)), url(${backgroundImage})`,
  };
  return (
    <div>
      <div className="servicesContainer" style={backgroundImageSlider}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CardServices;
