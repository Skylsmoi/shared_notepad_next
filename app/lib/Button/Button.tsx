import {MouseEventHandler, ReactNode} from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export const Button = (props:ButtonProps) => {
  return (
    <button
      className='cursor-pointer py-1 px-3 rounded-md bg-gray-900 hover:bg-gray-600'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
