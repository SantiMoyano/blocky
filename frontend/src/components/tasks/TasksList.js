import React from "react";
import Task from "./Task";

function TasksList({ list, isDone, handleClick, handleEdit, handleDelete }) {
  return (
    <>
      <ul className="border-t-2">
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
    </>
  );
}

export default TasksList;
