import React from "react";
import FormInput from "./FormInput";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

function Form({ formData, handleChange, handleSubmit, buttonInfo }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <form
          onSubmit={handleSubmit}
          className="mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
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
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            {buttonInfo}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Form;
