import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

interface SkipButtonProps {
  href?: string;
}

export const SkipButton: React.FC<SkipButtonProps> = ({ href = "/(tabs)" }) => {
  return (
    <TouchableOpacity
      style={styles.skipButton}
      onPress={() => router.push(href as any)}
    >
      <ThemedText style={styles.skipText}>Skip</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  skipButton: {
    position: "absolute",
    top: 65,
    right: 25,
    zIndex: 1,
  },
  skipText: {
    opacity: 0.6,
  },
});
