import React from "react";

const Counter = ({ name, href, id }) => {
  return (
    <div className="presenter-link">
      <a href={href} id={id}>
        {name}
      </a>
    </div>
  );
};

export default Counter;
