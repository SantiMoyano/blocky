import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function PopoverInfo({ popoverInfo }) {
  return (
    <Popover>
      <PopoverHandler>
        <InformationCircleIcon color="white" className="w-6 h-6" />
      </PopoverHandler>
      <PopoverContent className="font-custom text-black text-center">
        {popoverInfo}
      </PopoverContent>
    </Popover>
  );
}
