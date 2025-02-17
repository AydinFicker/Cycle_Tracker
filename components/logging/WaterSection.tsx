import React, { useState } from "react";
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
import { WaterSettingsModal } from "../modals/WaterSettingsModal";

interface WaterSectionProps {
  waterAmount: number;
  onIncrement: () => void;
  onDecrement: () => void;
  dailyGoal?: number;
  increment?: number;
  onSettingsChange?: (settings: {
    dailyGoal: number;
    increment: number;
  }) => void;
}

export const WaterSection: React.FC<WaterSectionProps> = ({
  waterAmount,
  onIncrement,
  onDecrement,
  dailyGoal = 72,
  increment = 8,
  onSettingsChange,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const handleSettingsPress = () => {
    setIsSettingsModalVisible(true);
  };

  const handleSettingsSubmit = (settings: {
    dailyGoal: number;
    increment: number;
  }) => {
    onSettingsChange?.(settings);
  };

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
          <TouchableOpacity onPress={handleSettingsPress}>
            <Ionicons name="settings-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.waterGoal}>
          {waterAmount} / {dailyGoal} fl. oz.
        </ThemedText>

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
            <ThemedText style={styles.waterUnit}>fl. oz.</ThemedText>
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

      <WaterSettingsModal
        isVisible={isSettingsModalVisible}
        onClose={() => setIsSettingsModalVisible(false)}
        onSubmit={handleSettingsSubmit}
        currentDailyGoal={dailyGoal}
        currentIncrement={increment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  waterSection: {
    borderRadius: 16,
    padding: 16,
  },
  waterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
    marginBottom: 16,
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
  waterUnit: {
    fontSize: 12,
    opacity: 0.7,
  },
});
