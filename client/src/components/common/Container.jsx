import React from "react";

export function Container({extraClasses, children}) {
  return (
    <div className={`container mx-auto px-4 ${extraClasses || ""}`}>
      {children}
    </div>
  );
}

export default Container;
