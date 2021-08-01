import React from "react";
import "./Button.scss";

interface IButton {
  title: string;
  form?: string;
  type?: "standard" | "login";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<IButton> = ({
  title,
  onClick,
  form,
  type = "standard",
}) => {
  //   console.log(onClick);
  return (
    <button
      className={`login-button login-button-border-${type}`}
      form={form}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
