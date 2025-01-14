import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface CircleLegendProps {
  color: string;
  children: React.ReactNode;
}

export const CircleLegend: React.FC<CircleLegendProps> = ({
  color,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: color }]} />
      <ThemedText style={styles.text}>{children}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 16,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 12,
    marginRight: 8,
  },
  text: {
    fontSize: 10,
  },
});
