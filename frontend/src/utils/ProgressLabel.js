import { Progress } from "@material-tailwind/react";

function ProgressLabel({ value }) {
  return <Progress value={value} size="sm" label=" " />;
}

export default ProgressLabel;
