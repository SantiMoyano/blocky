import { Button } from "@material-tailwind/react";

function ButtonCustom({ buttonText, handleSubmit, isDesc }) {
  return (
    <Button
      onClick={handleSubmit}
      size="lg"
      fullWidth
      className={
        "flex items-center justify-center font-custom rounded-none py-5 text-lg dark-red-bg " +
        (isDesc ? "descriptions" : "")
      }
    >
      {buttonText}
    </Button>
  );
}

export default ButtonCustom;
