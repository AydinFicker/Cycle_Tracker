import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { router } from "expo-router";

interface PillVerticalProps {
  title: string;
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  titleColor?: string;
  contentTextStyle?: ViewStyle;
  href?: string;
}

export const PillVertical: React.FC<PillVerticalProps> = ({
  title,
  children,
  style,
  backgroundColor,
  titleColor,
  contentTextStyle,
  href = "/(tabs)/Home",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        backgroundColor ? { backgroundColor } : {},
        style,
      ]}
      onPress={() => router.push(href as any)}
    >
      <ThemedText
        type="defaultSemiBold"
        style={[styles.title, titleColor ? { color: titleColor } : {}]}
        numberOfLines={2}
      >
        {title}
      </ThemedText>
      <View style={styles.content}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    width: "23%",
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
    lineHeight: 14,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});
