import React from "react";
import { FlowerBackground } from "./FlowerBackground";

export const ProfileIndexBackground: React.FC = () => {
  const flowers = [
    { size: 150, opacity: 0.35, top: 230, left: -60 },
    { size: 70, opacity: 0.1, top: 190, left: 30 },
    { size: 140, opacity: 0.2, top: 140, right: -40 },
    { size: 85, opacity: 0.075, top: 45, right: 20 },
    { size: 50, opacity: 0.15, top: 290, right: 50 },
  ];

  return <FlowerBackground flowers={flowers} />;
};
