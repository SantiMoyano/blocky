import "./blocky.css";

import Block from "./Block";

function BlockSection({ list, handleElemClick }) {
  return <DefaultGallery data={list} handleElemClick={handleElemClick} />;
}

export default BlockSection;

function DefaultGallery({ data, handleElemClick }) {
  return (
    <div className="flex items-center justify-center">
      <div className="pb-4 blocklist blockylist">
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
    </div>
  );
}
