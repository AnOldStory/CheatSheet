import React from "react";

const Counter = ({ name, id }) => {
  return (
    <div className="presenter-name" id={id}>
      {name}
    </div>
  );
};

export default Counter;
