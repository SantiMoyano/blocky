import React from "react";
import Subtask from "./Subtask";

function SubtasksList({ list, isDone }) {
  return (
    <>
      {!isDone ? <h2>To Do</h2> : <h2>Done tasks</h2>}
      <ul>
        {list.map((elem) => (
          <Subtask
            key={elem.id}
            description={elem.description}
            color={elem.color}
          />
        ))}
      </ul>
    </>
  );
}

export default SubtasksList;
