import { Button } from "@material-tailwind/react";

function ButtonCustom({ buttonText }) {
  return (
    <Button
      size="lg"
      fullWidth
      className="flex items-center justify-center font-custom rounded-none py-5 text-lg bg-black" // Adjusted padding
    >
      {buttonText}
    </Button>
  );
}

export default ButtonCustom;
