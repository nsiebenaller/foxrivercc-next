import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button
      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
