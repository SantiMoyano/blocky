import React from "react";

function Notification({ message, type }) {
  let renderedMessage = message;

  // If message is an object, convert it to a string
  if (typeof message === "object") {
    renderedMessage = JSON.stringify(message);
  }

  return (
    <p style={{ color: type === "success" ? "green" : "red", fontSize: 18 }}>
      {renderedMessage}
    </p>
  );
}

export default Notification;
