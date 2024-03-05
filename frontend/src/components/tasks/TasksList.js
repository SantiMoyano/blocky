import "../blocks/blocky.css";

import React from "react";
import Task from "./Task";

function TasksList({ list, isDone, handleClick, handleEdit, handleDelete }) {
  return (
    <div className="flex justify-center">
      <ul className="border-t-2 tasklist">
        {list.map((elem) => (
          <Task
            key={elem.id}
            description={elem.description}
            color={elem.color}
            isDone={isDone}
            handleClick={() => handleClick(elem.id)}
            handleEdit={() =>
              handleEdit({
                taskId: elem.id,
                description: elem.description,
                featureId: elem.featureId,
              })
            }
            handleDelete={() => handleDelete(elem.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TasksList;
