import React from "react";

export function Button({children, extraClasses, nativeType}) {
  return (
    <button
      type={nativeType}
      className={`px-6 py-2 border-2 border-black rounded ${extraClasses}`}
    >
      {children}
    </button>
  );
}

export default Button;
