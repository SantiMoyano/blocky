import { Input, Typography } from "@material-tailwind/react";
import React from "react";

function FormInput({ label, type, name, value, handleChange }) {
  return (
    <>
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        {label}
      </Typography>
      <Input
        size="lg"
        type={type}
        value={value}
        name={name}
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        onChange={handleChange}
      />
    </>
  );
}

export default FormInput;
