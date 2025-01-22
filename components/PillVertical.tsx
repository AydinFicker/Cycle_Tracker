import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";

interface PillVerticalProps {
  title: string;
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  titleColor?: string;
  contentTextStyle?: ViewStyle;
}

export const PillVertical: React.FC<PillVerticalProps> = ({
  title,
  children,
  style,
  backgroundColor,
  titleColor,
  contentTextStyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        backgroundColor ? { backgroundColor } : {},
        style,
      ]}
    >
      <ThemedText
        type="defaultSemiBold"
        style={[styles.title, titleColor ? { color: titleColor } : {}]}
        numberOfLines={2}
      >
        {title}
      </ThemedText>
      <View style={styles.content}>{children}</View>
    </View>
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
