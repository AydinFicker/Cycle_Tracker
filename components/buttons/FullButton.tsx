import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";

interface FullButtonProps {
  children: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  defaultColor?: string;
  defaultTextColor?: string;
}

export const FullButton: React.FC<FullButtonProps> = ({
  children,
  icon,
  rightIcon,
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
      {icon && <View style={styles.leftIcon}>{icon}</View>}
      <ThemedText
        type="default"
        style={[
          styles.text,
          defaultTextColor ? { color: defaultTextColor } : {},
        ]}
      >
        {children}
      </ThemedText>
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    // borderRadius: 12,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: "auto",
  },
  text: {
    fontSize: 16,
  },
});
