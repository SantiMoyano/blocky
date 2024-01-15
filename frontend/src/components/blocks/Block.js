function Block({ name, progress }) {
  return (
    <li>
      <p>{name}</p>
      <p>{progress}</p>
    </li>
  );
}

export default Block;
