import React from "react";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { ViewStyle } from "react-native";

interface DigitalTestIconProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
  color?: string;
}

export const DigitalTestIcon: React.FC<DigitalTestIconProps> = ({
  width = 40,
  height = 40,
  style,
  color = "#5AADE8", // Default to theme blue
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 40" style={style}>
      {/* Main device body */}
      <Rect
        x="5"
        y="8"
        width="30"
        height="24"
        rx="3"
        fill="white"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Screen area */}
      <Rect x="8" y="11" width="24" height="10" rx="1" fill="#F5F5F5" />

      {/* Display elements */}
      <Circle cx="12" cy="16" r="1" fill={color} />
      <Rect x="15" y="15" width="14" height="2" rx="1" fill={color} />

      {/* Buttons */}
      <Circle cx="12" cy="25" r="2" fill={color} opacity="0.2" />
      <Circle cx="20" cy="25" r="2" fill={color} opacity="0.2" />
      <Circle cx="28" cy="25" r="2" fill={color} opacity="0.2" />
    </Svg>
  );
};
