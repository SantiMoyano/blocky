import React from "react";
import FormInput from "./FormInput";

function Form({ formData, handleChange, handleSubmit, buttonInfo }) {
  return (
    <form onSubmit={handleSubmit}>
      {formData.map((el) => (
        <FormInput
          label={el.label}
          type={el.type}
          name={el.name}
          value={el.value}
          handleChange={handleChange}
          key={el.name}
        />
      ))}
      <button type="submit">{buttonInfo}</button>
    </form>
  );
}

export default Form;
