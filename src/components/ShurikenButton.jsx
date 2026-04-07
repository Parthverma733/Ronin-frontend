// components/ShurikenButton.jsx
import React, { useState } from "react";
import "./ShurikenButton.css";

const ShurikenButton = ({ children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="shuriken-button-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className="shuriken-button">{children}</button>

      {hovered &&
        ["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
          <div key={corner} className={`shuriken ${corner}`} >
            <img style={{width:"10px" ,color:"white"}} src="/ninja-star.png" alt="" />
          </div>
        ))}
    </div>
  );
};

export default ShurikenButton;