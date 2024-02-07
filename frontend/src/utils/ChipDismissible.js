import React from "react";
import { Chip } from "@material-tailwind/react";

function ChipDismissible({ handleAction, actionText }) {
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(true);
    handleAction();
  }

  return (
    <>
      {!open && (
        <Chip
          variant="ghost"
          color="red"
          value="Confirm delete"
          onClick={handleClick}
        />
      )}
      <Chip
        variant="ghost"
        color="red"
        value={actionText}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default ChipDismissible;
