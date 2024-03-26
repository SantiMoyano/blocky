import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function CardInfo({ cardContent }) {
  return (
    <Card className="max-w-[18rem] min-w-[18rem] overflow-hidden blue-bg shadow-none transform transition duration-300 ease-in-out hover:scale-105">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          className="min-h-[12rem]"
          src={cardContent.src}
          alt={cardContent.alt}
        />
      </CardHeader>
      <CardBody>
        <Typography
          variant="h4"
          color="blue-gray"
          className="font-custom text-white"
        >
          {cardContent.title}
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mt-3 font-custom text-white"
        >
          {cardContent.description}
        </Typography>
      </CardBody>
    </Card>
  );
}
