import clsx from "clsx";
import { on } from "events";
import { MouseEventHandler, useState } from "react";

interface ButtonProps {
  bgColor: "primary" | "secondary" | "BG" | "error";
  value: string;
  width?: string | number;
  py?: number;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({
  bgColor,
  value,
  width = "full",
  py = 0.5,
  onClick,
  type,
}: ButtonProps) => {
  return (
    <button
      //clsx generates strings from expressions to avoid bugs with string interpolation and tailwindcss
      // https://github.com/lukeed/clsx/blob/master/readme.md
      className={clsx(
        `bg-${bgColor} text-${bgColor}-text py-${py} w-${width} px-8 rounded-md`
      )}
      onClick={onClick}
      value={value}
      type={type}
    >
      {value}
    </button>
  );
};

export default Button;
