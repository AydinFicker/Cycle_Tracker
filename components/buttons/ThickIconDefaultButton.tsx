import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";

interface ThickIconDefaultButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  defaultColor?: string;
  defaultTextColor?: string;
}

export const ThickIconDefaultButton: React.FC<ThickIconDefaultButtonProps> = ({
  onPress,
  children,
  icon,
  style,
  defaultColor,
  defaultTextColor,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  // Use provided colors or fallback to theme colors
  const buttonDefaultColor = defaultColor ?? theme.buttonBackground;
  const textDefaultColor = defaultTextColor ?? theme.text;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: buttonDefaultColor,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>{icon}</View>
        <ThemedText style={[styles.text, { color: textDefaultColor }]}>
          {children}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
