import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface WaterSectionProps {
  waterAmount: number;
  onIncrement: () => void;
  onDecrement: () => void;
  dailyGoal?: number;
  settingsHref?: string;
}

export const WaterSection: React.FC<WaterSectionProps> = ({
  waterAmount,
  onIncrement,
  onDecrement,
  dailyGoal = 72,
  settingsHref = "/home",
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <View
        style={[styles.waterSection, { backgroundColor: theme.background }]}
      >
        <View style={styles.waterHeader}>
          <View style={styles.waterTitleContainer}>
            <Ionicons name="water" size={24} color={theme.blue} />
            <ThemedText style={styles.waterTitle}>Water</ThemedText>
          </View>
          <ThemedText style={styles.waterGoal}>
            {waterAmount} / {dailyGoal} fl. oz.
          </ThemedText>
        </View>

        <View style={styles.waterControls}>
          <TouchableOpacity
            onPress={onDecrement}
            style={[
              styles.waterButton,
              { backgroundColor: theme.buttonBackground },
            ]}
            disabled={waterAmount <= 0}
          >
            <Ionicons name="remove" size={24} color={theme.text} />
          </TouchableOpacity>

          <View style={styles.waterAmountContainer}>
            <ThemedText style={styles.waterAmount}>{waterAmount}</ThemedText>
          </View>

          <TouchableOpacity
            onPress={onIncrement}
            style={[
              styles.waterButton,
              { backgroundColor: theme.buttonBackground },
            ]}
          >
            <Ionicons name="add" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push(settingsHref as any)}
        style={[styles.remindersSection, { backgroundColor: theme.background }]}
      >
        <View style={styles.remindersTitleContainer}>
          <ThemedText style={styles.remindersTitle}>
            Reminders and Settings
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  waterSection: {
    borderRadius: 16,
    padding: 16,
  },
  waterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  waterTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  waterTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  waterGoal: {
    opacity: 0.7,
  },
  waterControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  waterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  waterAmountContainer: {
    alignItems: "center",
  },
  waterAmount: {
    fontSize: 24,
    fontWeight: "600",
  },
  remindersSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
  },
  remindersTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  remindersTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});
