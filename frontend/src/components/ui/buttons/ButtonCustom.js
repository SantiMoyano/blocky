import { Button } from "@material-tailwind/react";

function ButtonCustom({ buttonText, handleSubmit }) {
  return (
    <Button
      onClick={handleSubmit}
      size="lg"
      fullWidth
      className="flex items-center justify-center font-custom rounded-none py-5 text-lg bg-black" // Adjusted padding
    >
      {buttonText}
    </Button>
  );
}

export default ButtonCustom;
