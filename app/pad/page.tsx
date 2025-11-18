import PadTextArea from './PadTextArea'
import { getCurrentPad, getPadList } from "@/app/pad/action";
import { SavedPadList } from "@/app/lib/SavedPadList/SavedPadList";
import {SavePadButton} from "@/app/lib/SavePadButton/SavePadButton";

export default async function Pad () {
  const currentPad = await getCurrentPad()
  const padList = await getPadList()

  return (
    <div className="flex flex-col items-start h-full py-4 px-4">
      <h1 className="text-2xl font-semibold text-gray-100 w-full text-center pb-4">
        Pad
      </h1>

      <div className="flex flex-row w-full h-full gap-4 ">
        <div className="w-1/8 h-full bg-gray-500 p-4">
          <SavedPadList
            padList={padList}
          />
        </div>

        <div className="flex flex-col gap-4 w-7/8 h-full">
          <PadTextArea
            currentPad={currentPad}
          />

          <div className="flex flex-row justify-end">
            <SavePadButton currentPad={currentPad}/>
          </div>
        </div>
      </div>
    </div>
  )
}
