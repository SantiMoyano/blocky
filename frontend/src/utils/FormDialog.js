import { Button, Card, Dialog } from "@material-tailwind/react";

import React from "react";

function DialogWithForm({ childComponent, buttonInfo, isEdit }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <div className={` flex justify-end`}>
        <Button
          onClick={handleOpen}
          className={`${
            isEdit ? "edit-btn" : ""
          } dark-red-bg font-custom px-2 py-2`}
        >
          {buttonInfo}
        </Button>
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem] rounded-full">
          {childComponent}
        </Card>
      </Dialog>
    </>
  );
}

export default DialogWithForm;
