import Block from "./Block";

function BlockSection({ list, handleElemClick }) {
  return (
    <ul>
      {list.map((elem) => (
        // Pass the elem details to the Block component
        <Block
          key={elem.id}
          name={elem.name}
          progress={elem.progress}
          handleElemClick={() => handleElemClick(elem.id)}
        />
      ))}
    </ul>
  );
}

export default BlockSection;
