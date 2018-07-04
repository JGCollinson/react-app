import React from "react";

export const Row = ({ fluid, children }) => (
  <div className={`row${fluid ? "-fluid" : ""}`} style={{margin: "0 auto"}}>
    {children}
  </div>
);