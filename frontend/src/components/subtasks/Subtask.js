import React from "react";

function Subtask({ description, color }) {
  return <li style={{ backgroundColor: color }}>{description}</li>;
}

export default Subtask;
