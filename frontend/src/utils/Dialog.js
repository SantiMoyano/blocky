import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

import ButtonCustom from "../components/ui/buttons/ButtonCustom";
import React from "react";

function DialogDefault({ dialogName, dialogDescription }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="mt-1 mb-1">
      <ButtonCustom buttonText={dialogName} handleSubmit={handleOpen} />
      <Dialog open={open} handler={handleOpen} className="dark-red-bg">
        <DialogHeader
          style={{ textTransform: "uppercase" }}
          className="font-custom text-white"
        >
          {dialogName}
        </DialogHeader>
        <DialogBody className="font-custom text-white">
          {dialogDescription ? dialogDescription : "No description provided"}
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DialogDefault;
