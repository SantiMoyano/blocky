import "./blocky.css";

import SimpleCard from "./SimpleCard";

function Block({ name, progress, handleElemClick }) {
  return (
    <div className="flex justify-center items-center" onClick={handleElemClick}>
      <SimpleCard name={name} progress={progress} />
    </div>
  );
}

export default Block;
