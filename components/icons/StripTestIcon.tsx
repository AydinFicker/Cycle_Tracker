import React from "react";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { ViewStyle } from "react-native";

interface StripTestIconProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
  color?: string;
}

export const StripTestIcon: React.FC<StripTestIconProps> = ({
  width = 40,
  height = 40,
  style,
  color = "#5AADE8", // Default to theme blue
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 40" style={style}>
      {/* Main strip body */}
      <Rect
        x="8"
        y="5"
        width="24"
        height="30"
        rx="2"
        fill="white"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Test line area */}
      <Rect x="12" y="10" width="16" height="12" rx="1" fill="#F5F5F5" />

      {/* Test lines */}
      <Rect x="14" y="14" width="12" height="1" fill={color} />
      <Rect x="14" y="17" width="12" height="1" fill={color} />

      {/* Grip area */}
      <Rect
        x="12"
        y="24"
        width="16"
        height="6"
        rx="1"
        fill={color}
        opacity="0.2"
      />
    </Svg>
  );
};
