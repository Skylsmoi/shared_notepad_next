'use client'
import {deletePad, setCurrentPad} from "@/app/pad/action";
import {Button} from "@/app/lib/Button/Button";

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

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='font-bold'>Saved pad</h2>

      {props.padList.map(p => (
        <div
          className='flex flex-row gap-2 justify-between'
          key={p.id}
        >
          <Button
            onClick={() => setCurrentPad(p)}
            title='Open'
          >
            <div className='flex flex-col'>
              <div className='self-start text-lg'>{p.name}</div>
              <div className='self-end text-xs opacity-60'>{p.modified}</div>
            </div>
          </Button>

          <Button
            onClick={() => deletePad(p.id)}
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
