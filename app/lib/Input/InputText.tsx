import {ChangeEvent, ReactNode} from "react";

interface InputTextProps {
  name: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  customClassLabel?: string;
  customClassInput?: string;
}

export function InputText(props:InputTextProps):ReactNode {

  return (
    <label
      className={props.customClassLabel}
    >
      {props.label}

      <input
        className={`border-1 border-gray-50 rounded-sm px-2 py-1 ${props.customClassInput}`}
        type='text'
        name={props.name}
        onChange={props.onChange}
      />
    </label>
  )
}
