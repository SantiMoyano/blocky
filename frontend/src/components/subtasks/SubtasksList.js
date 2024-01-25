import React from "react";
import Subtask from "./Subtask";

function SubtasksList({ list, isDone, handleClick, handleEdit, handleDelete }) {
  return (
    <>
      {!isDone ? <h2>To Do</h2> : <h2>Done tasks</h2>}
      <ul>
        {list.map((elem) => (
          <Subtask
            key={elem.id}
            description={elem.description}
            color={elem.color}
            isDone={isDone}
            handleClick={() => handleClick(elem.id)}
            handleEdit={() =>
              handleEdit({
                subtaskId: elem.id,
                description: elem.description,
                taskId: elem.taskId,
              })
            }
            handleDelete={() => handleDelete(elem.id)}
          />
        ))}
      </ul>
    </>
  );
}

export default SubtasksList;
