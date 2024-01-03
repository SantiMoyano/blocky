import React from "react";

function FormInput({ label, type, name, value, handleChange }) {
  return (
    <div>
      <label htmlFor="name">{label}</label>
      <input type={type} name={name} value={value} onChange={handleChange} />
    </div>
  );
}

export default FormInput;
