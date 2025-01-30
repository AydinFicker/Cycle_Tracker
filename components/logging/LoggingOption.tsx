import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { LoggingOption as LoggingOptionType } from "@/types/logging";

interface LoggingOptionProps {
  option: LoggingOptionType;
  isSelected?: boolean;
  isGrid?: boolean;
  onPress: (id: string) => void;
}

export const LoggingOption: React.FC<LoggingOptionProps> = ({
  option,
  isSelected = false,
  isGrid = false,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        isGrid ? styles.gridItem : styles.listItem,
        { backgroundColor: option.backgroundColor },
        isSelected && styles.selected,
      ]}
      onPress={() => onPress(option.id)}
    >
      <View style={[styles.iconContainer, isGrid && styles.gridIcon]}>
        <View style={styles.iconWrapper}>
          <Ionicons
            name={option.icon as any}
            size={24}
            color={option.textColor || "#000"}
          />
        </View>
      </View>
      <ThemedText style={[styles.label, isGrid && styles.gridLabel]}>
        {option.label}
      </ThemedText>
      {option.hasAddButton && (
        <View style={styles.iconWrapper}>
          <Ionicons name="add" size={24} color={option.textColor || "#000"} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    opacity: 0.8,
    minHeight: 44,
  },
  listItem: {
    padding: 12,
    marginBottom: 8,
    width: "100%",
  },
  gridItem: {
    padding: 12,
    marginBottom: 8,
    flex: 1,
    minWidth: "45%",
    maxWidth: "48%",
    marginHorizontal: "1%",
    minHeight: 56,
  },
  selected: {
    opacity: 1,
    transform: [{ scale: 1.02 }],
  },
  iconContainer: {
    marginRight: 8,
    width: 24,
    height: 24,
    flexShrink: 0,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  gridIcon: {
    marginRight: 4,
  },
  label: {
    fontSize: 16,
    flex: 1,
    flexWrap: "wrap",
    marginRight: 4,
    lineHeight: 16,
  },
  gridLabel: {
    fontSize: 14,
    lineHeight: 14,
    flexShrink: 1,
    flexWrap: "wrap",
  },
});
