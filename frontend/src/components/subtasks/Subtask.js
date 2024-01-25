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
    <li>
      <p style={{ backgroundColor: color }}>{description}</p>
      <button onClick={handleClick}>{!isDone ? "Done" : "Todo"}</button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Subtask;
