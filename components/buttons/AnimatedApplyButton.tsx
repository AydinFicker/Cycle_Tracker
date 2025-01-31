import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { DefaultButton } from "./DefaultButton";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

interface AnimatedApplyButtonProps {
  isVisible: boolean;
  onPress: () => void;
}

export const AnimatedApplyButton: React.FC<AnimatedApplyButtonProps> = ({
  isVisible,
  onPress,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      // First move up with 0 opacity
      translateY.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.cubic),
      });
      // Then fade in
      opacity.value = withTiming(1, {
        duration: 150,
        easing: Easing.inOut(Easing.cubic),
      });
    } else {
      // First fade out
      opacity.value = withTiming(0, {
        duration: 150,
        easing: Easing.inOut(Easing.cubic),
      });
      // Then move down
      translateY.value = withTiming(100, {
        duration: 200,
        easing: Easing.in(Easing.cubic),
      });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    position: "absolute",
    bottom: 32,
    left: 20,
    right: 20,
    zIndex: 1000,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <DefaultButton
        onPress={onPress}
        defaultColor={theme.yellow}
        defaultTextColor={theme.white}
      >
        Apply
      </DefaultButton>
    </Animated.View>
  );
};
