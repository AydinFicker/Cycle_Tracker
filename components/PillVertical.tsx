import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";

interface PillVerticalProps {
  title: string;
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  titleColor?: string;
}

export const PillVertical: React.FC<PillVerticalProps> = ({
  title,
  children,
  style,
  backgroundColor,
  titleColor,
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
      >
        {title}
      </ThemedText>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    width: "23%",
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});
