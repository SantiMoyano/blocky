import { Chip } from "@material-tailwind/react";
import React from "react";

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
          className="edit-btn"
        />
      )}
      <Chip
        variant="ghost"
        color="red"
        value={actionText}
        open={open}
        onClose={() => setOpen(false)}
        className="edit-btn"
      />
    </>
  );
}

export default ChipDismissible;
