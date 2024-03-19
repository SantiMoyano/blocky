import "./blocky.css";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import ProgressLabel from "../../utils/ProgressLabel";

function SimpleCard({ name, progress }) {
  return (
    <Card className="flex justify-center blocky dark-red-bg rounded-sm border-4 block-hover ">
      <CardBody>
        <Typography
          variant="h5"
          color="white"
          className="mb-2 font-custom word-break-blocky"
        >
          {name.toUpperCase()}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-end">
        <ProgressLabel value={progress} />
      </CardFooter>
    </Card>
  );
}

export default SimpleCard;
