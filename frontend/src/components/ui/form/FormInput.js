import { Input, Textarea, Typography } from "@material-tailwind/react";

import React from "react";

function FormInput({ label, type, name, value, handleChange }) {
  return (
    <>
      <Typography
        variant="h6"
        color="white"
        className="-mb-5 ml-2 font-custom flex"
      >
        {label}
      </Typography>
      {type === "textarea" ? (
        <Textarea
          size="lg"
          type={type}
          value={value}
          name={name}
          className=" !border-white focus:!border-white bg-white font-custom"
          labelProps={{
            className: "before:content-none after:content-none ",
          }}
          onChange={handleChange}
        />
      ) : (
        <Input
          color="black"
          size="lg"
          type={type}
          value={value}
          name={name}
          className=" !border-white focus:!border-white bg-white font-custom"
          labelProps={{
            className: "before:content-none after:content-none ",
          }}
          onChange={handleChange}
        />
      )}
    </>
  );
}

export default FormInput;
