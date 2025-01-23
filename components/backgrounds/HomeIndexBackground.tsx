import React from "react";
import { FlowerBackground } from "./FlowerBackground";

export const HomeIndexBackground: React.FC = () => {
  const flowers = [
    { size: 120, opacity: 0.35, top: 175, right: -60 },
    { size: 60, opacity: 0.2, top: 180, right: 65 },
    { size: 45, opacity: 0.1, top: 325, right: -10 },
    { size: 150, opacity: 0.25, top: 425, left: -65 },
    { size: 50, opacity: 0.15, top: 375, left: -20 },
  ];

  return <FlowerBackground flowers={flowers} />;
};
