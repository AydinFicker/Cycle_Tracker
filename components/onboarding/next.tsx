import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface NextButtonProps {
  href?: string;
}

export const NextButton: React.FC<NextButtonProps> = ({ href = "/(tabs)" }) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(href as any)}
    >
      <View style={styles.content}>
        <ThemedText style={[styles.text, { color: theme.text }]}>
          Next
        </ThemedText>
        <Ionicons
          name="arrow-forward"
          size={24}
          color={theme.text}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 4,
  },
  icon: {
    fontWeight: "bold",
  },
});
