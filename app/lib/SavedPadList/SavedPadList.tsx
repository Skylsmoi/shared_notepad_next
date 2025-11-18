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
      {props.padList.map(p => (
        <div
          className='flex flex-row gap-2 justify-end'
          key={p.id}
        >
          <Button
            label={p.name}
            onClick={() => setCurrentPad(p)}
          />

          <Button
            label={'x'}
            onClick={() => deletePad(p.id)}
          />
        </div>
      ))}
    </div>
  )
}

export type { SavedPadType }
