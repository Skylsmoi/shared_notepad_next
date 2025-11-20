import {MouseEventHandler, ReactNode} from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  customClass?: string;
  rounded?: boolean;
  children: ReactNode;
}

export const Button = ({
  rounded = true,
  ...props
}:ButtonProps) => {
  return (
    <button
      className={`
        py-1 px-3
        cursor-pointer
        ${rounded ? 'rounded-md' : 'rounded-[0px]'}
        bg-gray-900 hover:bg-gray-600
        ${props.customClass}
      `}
      onClick={props.onClick}
      title={props.title}
    >
      {props.children}
    </button>
  )
}
