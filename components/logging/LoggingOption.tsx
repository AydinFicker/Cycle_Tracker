import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LoggingOption as LoggingOptionType } from "@/types/logging";

interface LoggingOptionProps {
  option: LoggingOptionType;
  isSelected?: boolean;
  isGrid?: boolean;
  onPress: (id: string) => void;
  categoryBackgroundColor: string;
}

export const LoggingOption: React.FC<LoggingOptionProps> = ({
  option,
  isSelected = false,
  isGrid = false,
  onPress,
  categoryBackgroundColor,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        isGrid ? styles.gridItem : styles.listItem,
        {
          backgroundColor: isSelected
            ? categoryBackgroundColor
            : option.backgroundColor,
        },
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
      <Text
        style={[styles.label, isGrid && styles.gridLabel, { color: "#000000" }]}
      >
        {option.label}
      </Text>
      {option.hasAddButton && (
        <View style={styles.iconWrapper}>
          <Ionicons name="add" size={24} color={option.textColor || "#000"} />
        </View>
      )}
      {isSelected && (
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark-circle" size={20} color="#000" />
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
    position: "relative",
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
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
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
  checkmarkContainer: {
    position: "absolute",
    bottom: -8,
    right: -8,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 0,
  },
});
