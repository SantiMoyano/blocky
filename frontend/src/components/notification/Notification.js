import React from "react";

function Notification({ message, type }) {
  return (
    <p style={{ color: type === "success" ? "green" : "red" }}>{message}</p>
  );
}

export default Notification;
