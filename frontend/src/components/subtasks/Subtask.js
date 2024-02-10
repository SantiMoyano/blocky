import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

function Subtask({
  description,
  color,
  isDone,
  handleClick,
  handleEdit,
  handleDelete,
}) {
  return (
    <li className="flex justify-between px-8 py-4 border-b-2">
      <p className=" flex p-0 text-sm items-center">{description}</p>
      {!isDone ? (
        <div className="flex gap-2">
          <button onClick={handleEdit}>
            <PencilIcon className="w-6 h-6 text-white rounded-sm border-2 hover:text-blue-700" />
          </button>
          <button onClick={handleClick}>
            <CheckIcon className="w-6 h-6 text-white rounded-sm border-2 hover:text-green-700" />
          </button>
          <button onClick={handleDelete}>
            <TrashIcon className="w-6 h-6 text-white rounded-sm border-2 hover:text-red-700" />
          </button>
        </div>
      ) : (
        <button onClick={handleDelete}>
          <TrashIcon className="w-6 h-6 text-white border-2 hover:text-red-700" />
        </button>
      )}
    </li>
  );
}

export default Subtask;
