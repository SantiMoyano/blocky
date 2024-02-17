import Block from "./Block";

function BlockSection({ list, handleElemClick }) {
  return <DefaultGallery data={list} handleElemClick={handleElemClick} />;
}

export default BlockSection;

function DefaultGallery({ data, handleElemClick }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-4 pb-4">
      {data.map((elem) => (
        // Pass the elem details to the Block component
        <Block
          key={elem.id}
          name={elem.name}
          progress={elem.progress}
          handleElemClick={() => handleElemClick(elem.id)}
        />
      ))}
    </div>
  );
}
