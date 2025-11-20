import {getCurrentPad, getPadList} from "@/app/pad/action";
import { SavedPadList } from "@/app/lib/SavedPadList/SavedPadList";
import Viewer from "@/app/view/Viewer";

export default async function View () {
  const currentPad = await getCurrentPad()
  const padList = await getPadList()

  return (
    <div className="flex flex-col items-start h-full py-4 px-4">
      <h1 className="text-2xl font-semibold text-gray-100 w-full text-center pb-4">
        View
      </h1>

      <div className="flex flex-row w-full h-full gap-4 ">
        <div className="w-1/5 h-full bg-gray-500 p-4 overflow-y-auto rounded-md">
          <SavedPadList
            padList={padList}
          />
        </div>

        <div className="w-4/5 flex flex-col gap-4 h-full">
          <Viewer pad={currentPad} />
        </div>
      </div>
    </div>
  )
}
