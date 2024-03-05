import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

import { useState } from "react";

function Chevron({ toggleChevron, text }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
    toggleChevron();
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-2 mb-2">
      <h4 className="font-bold text-white word-break-blocky">{text}</h4>
      <button onClick={handleClick}>
        {!isClicked ? (
          <ChevronDownIcon className="w-5 h-5 text-white  rounded-md" />
        ) : (
          <ChevronUpIcon className="w-5 h-5 text-white  rounded-md" />
        )}
      </button>
    </div>
  );
}

export default Chevron;
