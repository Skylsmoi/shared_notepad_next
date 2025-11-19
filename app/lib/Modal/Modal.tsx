'use client'

import {ReactNode, RefObject} from "react";
import {Button} from "@/app/lib/Button/Button";
import ClientOnlyPortal from "@/app/lib/utilClient";

interface ModalProps {
  dialogElementRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
  children: ReactNode
}

export function Modal (props: ModalProps) {
  /* eslint-disable react-hooks/refs */
  return (
    <ClientOnlyPortal selector={'body'}>
      <dialog
        className={`
          Modal
          top-1/2 left-1/2 -translate-1/2
          p-4 rounded-md
          backdrop:bg-gray-700 backdrop:opacity-60
        `}
        closedby='any'
        ref={props.dialogElementRef}
      >
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center border-b-1 border-gray-900 pb-2'>
            <div className=''>Confirm</div>

            <Button
              title={'Cancel'}
              onClick={props.onClose}
              customClass='text-white'
            >
              x
            </Button>
          </div>

          {props.children}

        </div>
      </dialog>,
    </ClientOnlyPortal>
  )
  /* eslint-enable react-hooks/refs */
}
