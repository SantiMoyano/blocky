import Block from "./Block";

function BlockSection({ list }) {
  return (
    <ul>
      {list.map((elem) => (
        // Pass the elem details to the Block component
        <Block key={elem.id} name={elem.name} progress={elem.progress} />
      ))}
    </ul>
  );
}

export default BlockSection;
