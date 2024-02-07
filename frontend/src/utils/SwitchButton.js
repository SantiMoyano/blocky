import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function SwitchButton({ text, handleClick }) {
  const [clicked, setClicked] = useState(false);

  const switchButton = () => {
    setClicked(!clicked);
    handleClick();
  };

  return !clicked ? (
    <div className="flex justify-end pr-8 pl-8 pt-8">
      <div onClick={switchButton} className="flex items-center justify-center">
        <p className=" pr-2 pl-2 p">{text}</p>
        <PlusIcon color="white" strokeWidth={4} className="h-6 w-6" />
      </div>
    </div>
  ) : (
    <div className="flex justify-end pr-8 pl-8 pt-8">
      <div onClick={switchButton} className="flex items-center justify-center">
        <XMarkIcon color="white" strokeWidth={4} className="h-6 w-6" />
      </div>
    </div>
  );
}

export default SwitchButton;
