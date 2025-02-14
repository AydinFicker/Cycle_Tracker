import React from "react";
import { StyleSheet, Animated, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { CYCLE_DATA } from "@/constants/CycleData";
import { differenceInDays } from "date-fns";

const PeriodCountdown = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const { currentCycle } = CYCLE_DATA;

  // Calculate days until period
  const daysUntilPeriod = differenceInDays(
    new Date(currentCycle.nextPeriodStart),
    new Date()
  );

  // Animation value for scaling
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.15,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor: theme.red40 }]}>
        <Animated.View
          style={[
            styles.innerCircle,
            { backgroundColor: theme.red },
            { transform: [{ scale }] },
          ]}
        >
          <Animated.View
            style={styles.content}
            onTouchStart={handlePressIn}
            onTouchEnd={handlePressOut}
          >
            <ThemedText style={styles.title}>Your period starts in</ThemedText>
            <View style={styles.daysContainer}>
              <ThemedText
                style={[styles.days, { color: theme.white }]}
                adjustsFontSizeToFit
              >
                {daysUntilPeriod} Days
              </ThemedText>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.white }]} />
            <ThemedText style={styles.phase}>Currently in the</ThemedText>
            <ThemedText style={styles.phaseType}>
              {currentCycle.currentPhase}
            </ThemedText>
          </Animated.View>
        </Animated.View>
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
  content: {
    width: "100%",
    height: "100%",
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
    height: 55,
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

export default PeriodCountdown;
