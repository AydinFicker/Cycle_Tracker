import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";

interface BigButtonProps {
  children: string;
  onPress: () => void;
  style?: ViewStyle;
  defaultColor?: string;
  defaultTextColor?: string;
}

export const BigButton: React.FC<BigButtonProps> = ({
  children,
  onPress,
  style,
  defaultColor,
  defaultTextColor,
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
        type="title"
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
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
