import { CardList } from "./CardList";
import { RecommendedMethodologySection } from "./RecommendedMethodologySection";
import { Typography } from "@material-tailwind/react";

const listCardsInfo = [
  {
    src: "images/dev-focus.png",
    alt: "dev-focus",
    title: "Project management",
    description:
      "Designed to assist individual developers in project management.",
  },
  {
    src: "images/app-process.png",
    alt: "dev-focus",
    title: "Simplified Development Workflow",
    description:
      "Divide your projects into user stories or similar, and maintain organization for enhanced productivity.",
  },
  {
    src: "images/progress.png",
    alt: "progress.png",
    title: "Monitorize your app progress",
    description:
      "Organize your app development tasks into manageable blocks and monitoring their progress.",
  },
];

function HomeContent() {
  return (
    <div className="flex flex-col justify-center items-center gradient-bg py-16">
      <div className="methodology-container w-full flex justify-center structure-text">
        <div>
          <Typography variant="h2" className="font-custom text-white">
            What is Blocky?
          </Typography>
        </div>
      </div>
      <CardList list={listCardsInfo} />
      <RecommendedMethodologySection />
    </div>
  );
}

export default HomeContent;
