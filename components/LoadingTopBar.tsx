import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

interface LoadingTopBarProps {
  progress: number; // 0 to 100
  style?: any;
}

export const LoadingTopBar: React.FC<LoadingTopBarProps> = ({
  progress,
  style,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={[styles.container, style]}>
      {/* Background bar */}
      <View
        style={[styles.backgroundBar, { backgroundColor: theme.middlegrey }]}
      />

      {/* Progress bar */}
      <View
        style={[
          styles.progressBar,
          {
            backgroundColor: theme.red,
            width: `${clampedProgress}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 12,
    width: "90%",
    position: "relative",
    top: 10,
  },
  backgroundBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  progressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 20,
  },
});
