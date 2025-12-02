'use client'

import {updateCurrentPad} from "@/app/pad/action";
import {ChangeEvent, useEffect, useState} from "react";

interface padType {
  currentPad: string,
}

export default function PadTextArea(props: padType) {
  const [pad, setPad] = useState<string>(props.currentPad);

  useEffect(() => {
    // FIXME - Bad pattern, textarea should not be controlled and sync with db
    // This is only for trying
    setPad(props.currentPad);
  }, [props.currentPad]);

  const handleChangeText = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPad(e.target.value);
    await updateCurrentPad(e.target.value)
  }

  return (
    <textarea
      value={pad}
      onChange={handleChangeText}
      name="PadTextArea"
      autoFocus
      className="PadTextArea w-full h-full p-4 bg-gray-800 border-1 border-gray-50 rounded-lg"
    >
    </textarea>
  )
}
