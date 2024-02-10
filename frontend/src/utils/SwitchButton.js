import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Chip } from "@material-tailwind/react";
import { useState } from "react";

function SwitchButton({ text, handleClick }) {
  const [clicked, setClicked] = useState(false);

  const switchButton = () => {
    setClicked(!clicked);
    handleClick();
  };

  return !clicked ? (
    <div className="flex justify-end px-8 pt-2">
      <div onClick={switchButton} className="flex items-center justify-center">
        <Chip value={text} className=" pr-2 pl-2 p dark-red-bg" />
        {/* <PlusIcon color="white" strokeWidth={4} className="h-6 w-6" /> */}
      </div>
    </div>
  ) : (
    <div className="flex justify-end px-8 pt-2">
      <div onClick={switchButton} className="flex items-center justify-center">
        <Chip value="X" className="dark-red-bg" />
        {/* <XMarkIcon color="white" strokeWidth={4} className="h-6 w-6" /> */}
      </div>
    </div>
  );
}

export default SwitchButton;
