import "./blocky.css";

import { Button, Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";

import Block from "./Block";

function BlockSection({ list, handleElemClick }) {
  return <DefaultGallery data={list} handleElemClick={handleElemClick} />;
}

export default BlockSection;

function DefaultGallery({ data, handleElemClick }) {
  const [dataSorted, setDataSorted] = useState(data);

  const handleSortByChange = (value) => {
    if (value === "progressAsc") {
      setDataSorted([...data].sort((a, b) => a.progress - b.progress));
    } else if (value === "progressDesc") {
      setDataSorted([...data].sort((a, b) => b.progress - a.progress));
    } else {
      setDataSorted(data);
    }
  };

  useEffect(() => {
    setDataSorted(data);
  }, [data]);

  return (
    <div className="flex items-center justify-center flex-col">
      <SelectBlockOrder handleSortByChange={handleSortByChange} />
      <div className="pb-4 blocklist blockylist">
        {dataSorted.map((elem) => (
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

function SelectBlockOrder({ handleSortByChange }) {
  return (
    <div className="flex justify-center items-center blocky-select">
      <div className="rounded-sm ">
        <Select
          color="black"
          label="Sort by"
          className="text-white font-bold border-2 select-width"
          onChange={(e) => handleSortByChange(e)}
        >
          <Option value="progressAsc" className="font-semibold ">
            PROGRESS (ASC.)
          </Option>
          <Option value="progressDesc" className="font-semibold">
            PROGRESS (DESC.)
          </Option>
        </Select>
      </div>
    </div>
  );
}
