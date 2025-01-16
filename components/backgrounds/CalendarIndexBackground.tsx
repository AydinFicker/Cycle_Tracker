import React from "react";
import { FlowerBackground } from "./FlowerBackground";

export const CalendarIndexBackground: React.FC = () => {
  const flowers = [
    { size: 175, opacity: 0.35, top: 575, left: -100 },
    { size: 120, opacity: 0.25, top: 580, left: 75 },
    { size: 45, opacity: 0.1, top: 495, left: -20 },
    { size: 80, opacity: 0.15, top: 10, right: -40 },
    { size: 50, opacity: 0.05, top: 100, right: -10 },
    // { size: 80, opacity: 0.15, top: 475, left: 65 },
  ];

  return <FlowerBackground flowers={flowers} />;
};
