import { Button } from "@material-tailwind/react";

function ButtonWithArrow({ buttonText, handleClick }) {
  return (
    <Button
      onClick={handleClick}
      size="lg"
      fullWidth
      className="flex items-center justify-between font-custom rounded-none py-5 text-lg dark-red-bg border-2" // Adjusted padding
    >
      {buttonText}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>
    </Button>
  );
}

export default ButtonWithArrow;
