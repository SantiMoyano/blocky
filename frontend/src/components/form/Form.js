import React from "react";
import FormInput from "./FormInput";

function Form({ formData, handleChange }) {
  return (
    <>
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
    </>
  );
}

export default Form;
