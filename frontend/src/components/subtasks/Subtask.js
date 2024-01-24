import React from "react";

function Subtask({ description, color, isDone, handleClick, handleEdit }) {
  return (
    <li>
      <p style={{ backgroundColor: color }}>{description}</p>
      <button onClick={handleClick}>{!isDone ? "Done" : "Todo"}</button>
      <button onClick={handleEdit}>Edit</button>
    </li>
  );
}

export default Subtask;
