'use client'

import {ChangeEvent, useState, useRef, useTransition} from 'react';
import {getPadList, savePad} from '@/app/pad/action'
import {Button} from "@/app/lib/Button/Button";
import {Modal} from "@/app/lib/Modal/Modal";

interface SavePadButtonProps {
  currentPad: string
}

export const SavePadButton = (props: SavePadButtonProps) => {
  const [padName, setPadName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const dialogElementRef = useRef<HTMLDialogElement>(null);
  const [isSavePadPending, startSavePadTransition] = useTransition();

  const handleChangePadName = (e:ChangeEvent<HTMLInputElement>): void => {
    setMessage('')
    setPadName(e.target.value)
  }

  const handleClickSaveButton = async () => {
    if (padName === '') {
      setMessage('Pad name cannot be empty');
      return
    }

    const padList = await getPadList();
    if (padList.some(p => p.name === padName)) {
      dialogElementRef.current?.showModal()
      return
    }

    startSavePadTransition(async () => {
      await savePad(padName, props.currentPad);
      startSavePadTransition(() => {
        setMessage('Pad saved');
      })
    })
  }

  const handleClickModalSaveButton = () => {
    startSavePadTransition(async () => {
      await savePad(padName, props.currentPad);
      startSavePadTransition(() => {
        setMessage('Pad saved');
      })
    })

    dialogElementRef.current?.close()
  }

  const handleClickCloseModal = () => {
    dialogElementRef.current?.close()
  }

  return (
    <>
      <div className='SavePadButton flex flex-row items-center gap-4'>
        <div className='text-red-100 opacity-75'>
          {isSavePadPending ? 'Saving...' : message }
        </div>

        <label className='flex flex-row gap-2 items-center'>
          Pad name:
          <input
            type='text'
            name='SavePadName'
            className='border-1 border-gray-50 rounded-sm px-2 py-1'
            onChange={handleChangePadName}
          />
        </label>

        <Button
          onClick={handleClickSaveButton}
          title={'Save'}
        >
          Save Pad
        </Button>
      </div>

      <Modal
        dialogElementRef={dialogElementRef}
        onClose={handleClickCloseModal}
      >
        <div>Name <span className="font-bold">{padName}</span> already exists. <br /> Overrides?</div>

        <div className='flex flex-row justify-end gap-2 text-white'>
          <Button title={'Cancel'} onClick={handleClickCloseModal}>
            <div>Cancel</div>
          </Button>

          <Button title={'Override'} onClick={handleClickModalSaveButton}>
            <div>Override</div>
          </Button>
        </div>
      </Modal>
    </>
  )
}
