import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";

interface SmallButtonProps {
  children: string;
  onPress: () => void;
  style?: ViewStyle;
  defaultColor?: string;
  defaultTextColor?: string;
  isSelected?: boolean;
}

export const SmallButton: React.FC<SmallButtonProps> = ({
  children,
  onPress,
  style,
  defaultColor,
  defaultTextColor,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        defaultColor ? { backgroundColor: defaultColor } : {},
        style,
      ]}
      activeOpacity={0.7}
    >
      <ThemedText
        type="default"
        style={[
          styles.text,
          defaultTextColor ? { color: defaultTextColor } : {},
        ]}
      >
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});
