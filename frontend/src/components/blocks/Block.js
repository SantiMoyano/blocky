import SimpleCard from "./SimpleCard";

function Block({ name, progress, handleElemClick }) {
  return (
    <li className="flex items-center justify-center" onClick={handleElemClick}>
      <SimpleCard name={name} progress={progress} />
    </li>
  );
}

export default Block;
