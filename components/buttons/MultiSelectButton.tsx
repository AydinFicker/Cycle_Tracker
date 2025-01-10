import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface MultiSelectButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  isSelected?: boolean;
  style?: StyleProp<ViewStyle>;
  defaultColor?: string;
  highlightColor?: string;
  defaultTextColor?: string;
  highlightTextColor?: string;
}

export const MultiSelectButton: React.FC<MultiSelectButtonProps> = ({
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

  const buttonDefaultColor = defaultColor ?? theme.middlegrey;
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
      {isSelected && (
        <View style={styles.checkmarkContainer}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={textHighlightColor}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
  },
  checkmarkContainer: {
    marginLeft: 10,
  },
});
