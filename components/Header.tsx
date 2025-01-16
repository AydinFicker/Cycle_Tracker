import React from "react";
import { StyleSheet, View, Pressable, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  style,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        {showBackButton ? (
          <Pressable hitSlop={8} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color={theme.text} />
          </Pressable>
        ) : null}
      </View>
      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
      </View>
      <View style={styles.rightContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 110,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  leftContainer: {
    width: 40,
    height: 28,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    width: 40,
    height: 28,
  },
  title: {
    textAlign: "center",
  },
});
