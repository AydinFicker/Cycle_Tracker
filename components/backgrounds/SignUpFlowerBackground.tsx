import React from "react";
import { FlowerBackground } from "./FlowerBackground";

export const SignUpFlowerBackground: React.FC = () => {
  const flowers = [
    { size: 175, opacity: 0.35, top: 0, right: -90 },
    { size: 120, opacity: 0.25, top: 0, right: 90 },
    { size: 45, opacity: 0.1, top: 120, right: 80 },
    { size: 80, opacity: 0.15, top: 150, right: 140 },
    { size: 50, opacity: 0.05, top: 240, right: 80 },
    { size: 80, opacity: 0.15, top: 200, right: -30 },
  ];

  return <FlowerBackground flowers={flowers} />;
};
