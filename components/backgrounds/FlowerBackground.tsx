import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

interface FlowerProps {
  size: number;
  opacity: number;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  color?: string;
}

interface FlowerBackgroundProps {
  flowers: FlowerProps[];
  style?: ViewStyle;
}

export const FlowerBackground: React.FC<FlowerBackgroundProps> = ({
  flowers,
  style,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <View style={[styles.container, style]}>
      {flowers.map((flower, index) => (
        <Ionicons
          key={index}
          name="flower"
          size={flower.size}
          style={[
            styles.flower,
            {
              opacity: flower.opacity,
              ...(flower.top !== undefined && { top: flower.top }),
              ...(flower.bottom !== undefined && { bottom: flower.bottom }),
              ...(flower.right !== undefined && { right: flower.right }),
              ...(flower.left !== undefined && { left: flower.left }),
              color: flower.color ?? theme.text,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    height: 200,
  },
  flower: {
    position: "absolute",
  },
});
