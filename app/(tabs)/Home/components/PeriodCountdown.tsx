import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export const PeriodCountdown = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor: theme.red40 }]}>
        <View style={[styles.innerCircle, { backgroundColor: theme.red }]}>
          <ThemedText style={styles.title}>Your period starts in</ThemedText>
          <View style={styles.daysContainer}>
            <ThemedText
              style={[styles.days, { color: theme.white }]}
              adjustsFontSizeToFit
            >
              4 Days
            </ThemedText>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.white }]} />
          <ThemedText style={styles.phase}>Currently in the</ThemedText>
          <ThemedText style={styles.phaseType}>Ovulation Phase</ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  circle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  innerCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    color: "white",
  },
  daysContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 65,
  },
  days: {
    fontSize: 36,
    fontWeight: "400",
    lineHeight: 36,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  divider: {
    height: 3,
    width: "80%",
    opacity: 1,
  },
  phase: {
    fontSize: 16,
    color: "white",
    marginTop: 8,
  },
  phaseType: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginTop: 4,
  },
});
