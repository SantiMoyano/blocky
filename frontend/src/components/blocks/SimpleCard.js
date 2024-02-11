import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import ProgressLabel from "../../utils/ProgressLabel";

function SimpleCard({ name, progress }) {
  return (
    <Card className="flex justify-center blocky dark-red-bg rounded-none">
      <CardBody>
        <Typography variant="h5" color="white" className="mb-2 font-custom">
          {name}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-end">
        <ProgressLabel value={progress} />
      </CardFooter>
    </Card>
  );
}

export default SimpleCard;
