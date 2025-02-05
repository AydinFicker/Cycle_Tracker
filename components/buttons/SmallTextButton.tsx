import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

interface SmallTextButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

export const SmallTextButton: React.FC<SmallTextButtonProps> = ({
  children,
  onPress,
  style,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
