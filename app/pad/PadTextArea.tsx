'use client'

import {updateCurrentPad} from "@/app/pad/action";
import {ChangeEvent} from "react";

interface padType {
  currentPad: string,
}

export default function PadTextArea(props: padType) {
  const handleChangeText = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log('e', e)
    await updateCurrentPad(e.target.value)
  }

  return (
    <textarea
      value={props.currentPad}
      onChange={handleChangeText}
      name="PadTextArea"
      autoFocus
      className="PadTextArea w-full h-full p-4 bg-gray-800 border-1 border-gray-50 rounded-lg"
    >
    </textarea>
  )
}
