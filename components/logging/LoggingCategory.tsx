import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { LoggingCategory as LoggingCategoryType } from "@/types/logging";
import { LoggingOption } from "./LoggingOption";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

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
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <View style={styles.container}>
      <View
        style={[styles.contentContainer, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <ThemedText type="subtitle" style={styles.title}>
            {category.title}
          </ThemedText>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  contentContainer: {
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
