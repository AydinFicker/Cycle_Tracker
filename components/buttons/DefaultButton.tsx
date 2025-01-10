import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";

interface DefaultButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  isSelected?: boolean;
  style?: StyleProp<ViewStyle>;
  defaultColor?: string;
  highlightColor?: string;
  defaultTextColor?: string;
  highlightTextColor?: string;
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  onPress,
  children,
  isSelected = false,
  style,
  defaultColor,
  highlightColor,
  defaultTextColor,
  highlightTextColor,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  // Use provided colors or fallback to theme colors
  const buttonDefaultColor = defaultColor ?? theme.buttonBackground;
  const buttonHighlightColor = highlightColor ?? theme.yellow;
  const textDefaultColor = defaultTextColor ?? theme.text;
  const textHighlightColor = highlightTextColor ?? theme.white;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isSelected
            ? buttonHighlightColor
            : buttonDefaultColor,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { color: isSelected ? textHighlightColor : textDefaultColor },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    width: "100%",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});
