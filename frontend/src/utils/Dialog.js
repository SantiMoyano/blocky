import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ButtonCustom from "../components/ui/buttons/ButtonCustom";

function DialogDefault({ dialogName, dialogDescription }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="mt-1 mb-1">
      <ButtonCustom buttonText={dialogName} handleSubmit={handleOpen} />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{dialogName}</DialogHeader>
        <DialogBody>
          {dialogDescription ? dialogDescription : "No description provided"}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DialogDefault;
