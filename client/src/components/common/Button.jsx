import React from "react";

export function Button({
  background,
  backgroundHover,
  border,
  borderHover,
  children,
  extraClasses,
  text,
  nativeType,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      type={nativeType}
      className={`px-6 py-2 text-${text || "black"} bg-${
        background || "white"
      } duration-75 hover:bg-${backgroundHover || "gray-200"} border-2 border-${
        border || "black"
      } hover:border-${borderHover || "black"} rounded ${extraClasses}`}
    >
      {children}
    </button>
  );
}

export default Button;
