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
import { WeightSettingsModal } from "../modals/WeightSettingsModal";

interface WeightSectionProps {
  weight: number | null;
  unit: "lbs" | "kg";
  onWeightChange: (weight: number | null, unit: "lbs" | "kg") => void;
}

export const WeightSection: React.FC<WeightSectionProps> = ({
  weight,
  unit,
  onWeightChange,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const handlePress = () => {
    setIsSettingsModalVisible(true);
  };

  const handleWeightSubmit = (
    newWeight: number | null,
    newUnit: "lbs" | "kg"
  ) => {
    onWeightChange(newWeight, newUnit);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.weightSection, { backgroundColor: theme.background }]}
        onPress={handlePress}
      >
        <View style={styles.weightHeader}>
          <View style={styles.weightTitleContainer}>
            <Ionicons name="scale" size={24} color={theme.red} />
            <ThemedText style={styles.weightTitle}>Weight</ThemedText>
          </View>
          {weight !== null && (
            <TouchableOpacity
              onPress={() => onWeightChange(null, unit)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="trash-outline" size={24} color={theme.text} />
            </TouchableOpacity>
          )}
        </View>

        {weight && (
          <ThemedText style={styles.weightValue}>
            {weight.toFixed(1)} {unit}
          </ThemedText>
        )}

        {!weight && <ThemedText>Log your weight</ThemedText>}
      </TouchableOpacity>

      <WeightSettingsModal
        isVisible={isSettingsModalVisible}
        onClose={() => setIsSettingsModalVisible(false)}
        onSubmit={handleWeightSubmit}
        currentWeight={weight}
        currentUnit={unit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  weightSection: {
    borderRadius: 16,
    padding: 16,
  },
  weightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  weightTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  weightTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  weightValue: {
    opacity: 0.7,
    fontSize: 20,
  },
});
