import React from "react";

const CodeName = ({ name, id }) => {
  return (
    <div className="presenter-name" id={id}>
      {name}
    </div>
  );
};

export default CodeName;
