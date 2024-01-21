import React from "react";

function Subtask({ description, color, isDone, handleClick }) {
  return (
    <li>
      <p style={{ backgroundColor: color }}>{description}</p>
      <button onClick={handleClick}>{!isDone ? "Done" : "Todo"}</button>
    </li>
  );
}

export default Subtask;
