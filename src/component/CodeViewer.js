import React from "react";
import { PrismCode } from "react-prism";

const Counter = ({ type, code }) => {
  return (
    <div className="presenter-code">
      <PrismCode component="pre" className={"language-" + type}>
        {code}
      </PrismCode>
    </div>
  );
};

export default Counter;
