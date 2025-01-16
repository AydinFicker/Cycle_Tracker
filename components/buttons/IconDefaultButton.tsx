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

interface IconDefaultButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  isSelected?: boolean;
  style?: StyleProp<ViewStyle>;
  defaultColor?: string;
  highlightColor?: string;
  defaultTextColor?: string;
  highlightTextColor?: string;
}

export const IconDefaultButton: React.FC<IconDefaultButtonProps> = ({
  onPress,
  children,
  icon,
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
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text
          style={[
            styles.text,
            { color: isSelected ? textHighlightColor : textDefaultColor },
          ]}
        >
          {children}
        </Text>
      </View>
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
    fontWeight: "500",
  },
});
