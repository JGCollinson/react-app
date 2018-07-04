import React from "react";

export const Container = ({ fluid, children }) => (
  <div className={`container${fluid ? "-fluid" : ""}`} style={{float: "none", margin: "0 auto"}}>
    {children}
  </div>
);