'use client'

import {ChangeEvent, useState, useRef} from 'react';
import {getPadList, savePad} from '@/app/pad/action'
import {Button} from "@/app/lib/Button/Button";

interface SavePadButtonProps {
  currentPad: string
}

export const SavePadButton = (props: SavePadButtonProps) => {
  const [padName, setPadName] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');
  const dialogElementRef = useRef<HTMLDialogElement>(null);

  const handleClickSaveButton = async () => {
    if (padName === '') {
      setMessageError('Pad name cannot be empty');
      return
    }

    const padList = await getPadList();
    if (padList.some(p => p.name === padName)) {
      dialogElementRef.current?.showModal()
      return
    }

    savePad(padName, props.currentPad);
  }

  const handleClickModalSaveButton = () => {
    dialogElementRef.current?.showModal()
    savePad(padName, props.currentPad);
  }

  return (
    <>
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
          title={'Save'}
        >
          Save Pad
        </Button>
      </div>

      <dialog
        className={`
          SavePadButtonModal
          top-1/2 left-1/2 -translate-1/2
          p-4 rounded-md
          backdrop:bg-gray-700 backdrop:opacity-60
        `}
        ref={dialogElementRef}
      >
        <div className='flex flex-col gap-4'>
          <div>Name <span className="font-bold">{padName}</span> already exists. <br /> Overrides?</div>

          <div className='flex flex-row justify-end gap-2 text-white'>
            <Button title={'Cancel'} onClick={() => {
              dialogElementRef.current?.close()
            }}>
              <div>Cancel</div>
            </Button>

            <Button title={'Override'} onClick={handleClickModalSaveButton}>
              <div>Override</div>
            </Button>
          </div>
        </div>
      </dialog>
    </>
  )
}
