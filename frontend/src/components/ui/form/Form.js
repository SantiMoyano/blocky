import { Card, Typography } from "@material-tailwind/react";

import ButtonCustom from "../buttons/ButtonCustom";
import FormInput from "./FormInput";
import React from "react";

function Form({ formData, formInfo, handleChange, handleSubmit, buttonInfo }) {
  return (
    <div className="flex justify-center blue-bg w-full px-6">
      <Card color="transparent" shadow={false} className="w-80">
        <Typography
          variant="h3"
          color="white"
          className="text-center font-custom pb-4"
        >
          {formInfo ? formInfo.toUpperCase() : buttonInfo.toUpperCase()}
        </Typography>
        <form onSubmit={handleSubmit} className="mb-2 w-full">
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
          <div className="pt-10 pb-5">
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
