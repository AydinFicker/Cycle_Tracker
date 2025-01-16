import React from "react";
import { FlowerBackground } from "./FlowerBackground";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export const IndexFlowerBackground: React.FC = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const flowers = [
    { size: 175, opacity: 0.35, top: 0, left: -90 },
    { size: 120, opacity: 0.25, top: 50, left: 75 },
    { size: 45, opacity: 0.1, top: 160, left: 45 },
    { size: 80, opacity: 0.15, top: 180, left: 160 },
    { size: 50, opacity: 0.05, top: 250, left: 80 },
    { size: 80, opacity: 0.15, top: 200, left: -30 },
    { size: 50, opacity: 1, top: 270, left: 260, color: theme.red },
  ];

  return <FlowerBackground flowers={flowers} />;
};
