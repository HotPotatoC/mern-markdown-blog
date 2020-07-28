import React from "react";

export function Container({extraClasses, children}) {
  return (
    <div className={`container mx-auto pb-4 px-4 ${extraClasses || ""}`}>
      {children}
    </div>
  );
}

export default Container;
