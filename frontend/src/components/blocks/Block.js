function Block({ name, progress, handleElemClick }) {
  return (
    <li onClick={handleElemClick}>
      <p>{name}</p>
      <p>{progress}</p>
    </li>
  );
}

export default Block;
