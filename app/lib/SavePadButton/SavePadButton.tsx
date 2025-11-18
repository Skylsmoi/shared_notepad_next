'use client'

import { ChangeEvent, useState, MouseEvent } from 'react';
import { savePad } from '@/app/pad/action'
import {Button} from "@/app/lib/Button/Button";

interface SavePadButtonProps {
  currentPad: string
}

export const SavePadButton = (props: SavePadButtonProps) => {
  const [padName, setPadName] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');

  const handleClickSaveButton = (e:MouseEvent) => {
    if (padName === '') {
      setMessageError('Pad name cannot be empty');
      return
    }

    savePad(padName, props.currentPad);
  }

  return (
    <div className='SavePadButton flex flex-row items-center gap-4'>
      <div className='text-red-100 opacity-75'>{messageError}</div>

      <input
        type='text'
        name='SavePadName'
        className='border-1 border-gray-50 rounded-sm px-2 py-1'
        onChange={(e:ChangeEvent<HTMLInputElement>): void => setPadName(e.target.value)}
      />

      <Button
        onClick={handleClickSaveButton}
      >
        Save Pad
      </Button>
    </div>
  )
}
