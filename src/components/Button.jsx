import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor}  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

// we took children as a parameter for button component just to change text of button as per our convinience
