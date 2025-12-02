'use client'

import { useContext } from 'react';
import { usePathname } from 'next/navigation'
import {deletePad, setCurrentPad} from "@/app/pad/action";
import {Button} from "@/app/lib/Button/Button";
import { LoginContext } from "@/app/lib/loginContext";
import Link from 'next/link'

interface SavedPadType {
  id: number;
  name: string;
  text: string;
  modified: string;
}

interface SavedPadListProps {
  padList: SavedPadType[];
}

export const SavedPadList = (props: SavedPadListProps) => {
  const pathname = usePathname()

  const { login, setLogin } = useContext(LoginContext)
  if (login.isLoggedIn === false) {
    return (
      <div>
        Not logged in. <br />

        <Link href={`/login?from=${pathname}`}>
          <Button title='Login' onClick={() => {}}>
            Login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button
        onClick={() => setCurrentPad({ id: 0, name: '', text: '', modified: '' })}
        title='New'
        customClass='text-center py-3'
      >
        New Pad
      </Button>

      <hr />

      <h2 className='font-bold'>Saved pad</h2>

      {props.padList.map(p => (
        <div
          className='flex flex-row w-full'
          key={p.id}
        >
          <Button
            onClick={() => setCurrentPad(p)}
            rounded={false}
            customClass={'rounded-l-md grow w-[calc(100%-32px)]'} // 32px is delete button width
            title={p.name}
          >
            <div className='flex flex-col w-full'>
              <div className='self-start text-md text-left w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                {p.name}
              </div>
              <div className='self-end text-xs opacity-60'>{p.modified}</div>
            </div>
          </Button>

          <Button
            onClick={() => deletePad(p.id)}
            rounded={false}
            customClass={'rounded-r-md'}
            title={'Delete'}
          >
            x
          </Button>
        </div>
      ))}
    </div>
  )
}

export type { SavedPadType }
