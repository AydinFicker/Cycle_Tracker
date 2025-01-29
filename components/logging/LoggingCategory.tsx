import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { LoggingCategory as LoggingCategoryType } from "@/types/logging";
import { LoggingOption } from "./LoggingOption";
import { Ionicons } from "@expo/vector-icons";

interface LoggingCategoryProps {
  category: LoggingCategoryType;
  selectedOptions: string[];
  onOptionPress: (id: string) => void;
}

export const LoggingCategory: React.FC<LoggingCategoryProps> = ({
  category,
  selectedOptions,
  onOptionPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          {category.title}
        </ThemedText>
        {category.hasTutorial && (
          <View style={styles.tutorialButton}>
            <ThemedText style={styles.tutorialText}>Tutorial</ThemedText>
            <Ionicons name="play-circle" size={16} color="#007AFF" />
          </View>
        )}
      </View>

      {category.description && (
        <ThemedText style={styles.description}>
          {category.description}
        </ThemedText>
      )}

      <View
        style={[
          styles.optionsContainer,
          category.isGrid && styles.gridContainer,
        ]}
      >
        {category.options.map((option) => (
          <LoggingOption
            key={option.id}
            option={option}
            isSelected={selectedOptions.includes(option.id)}
            isGrid={category.isGrid}
            onPress={onOptionPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  tutorialButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tutorialText: {
    color: "#007AFF",
    fontSize: 14,
  },
  description: {
    opacity: 0.7,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 8,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginHorizontal: -4,
  },
});
