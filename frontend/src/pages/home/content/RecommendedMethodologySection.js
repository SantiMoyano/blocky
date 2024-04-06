import "./methodology.css";

import { useEffect, useState } from "react";

import { Typography } from "@material-tailwind/react";

export function RecommendedMethodologySection() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    function checkResolution() {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 660); // Aquí puedes ajustar el ancho de pantalla para considerarlo como móvil
    }

    checkResolution();

    window.addEventListener("resize", checkResolution);

    return () => {
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center pt-16">
      <div className="methodology-container w-full flex pl-14 structure-text">
        <div>
          <Typography variant="h2" className="font-custom text-white">
            How to Structure Your Software Project
          </Typography>
        </div>
      </div>
      <figure className="methodology-container">
        <img
          className="w-full"
          src={
            !isMobile
              ? "images/methodology.png"
              : "images/methodology-responsive.png"
          }
          alt="images"
        />
      </figure>
    </div>
  );
}
