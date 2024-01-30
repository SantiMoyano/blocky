import React from "react";
import FormInput from "./FormInput";

import { Card, Typography } from "@material-tailwind/react";
import ButtonCustom from "../buttons/ButtonCustom";

function Form({ formData, handleChange, handleSubmit, buttonInfo }) {
  return (
    <div className="flex justify-center pt-6 h-screen red-bg">
      <Card color="transparent" shadow={false}>
        <Typography
          variant="h2"
          color="white"
          className="text-center font-custom pb-4"
        >
          {buttonInfo}
        </Typography>
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
          <div className="pt-10">
            <ButtonCustom
              buttonText={buttonInfo}
              handleSubmit={handleSubmit}
              type="submit"
              fullWidth
            />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Form;
