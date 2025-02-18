import React, { useState } from "react";
import { Modal, View, StyleSheet, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { SmallTextButton } from "../buttons/SmallTextButton";
import { DefaultButton } from "../buttons/DefaultButton";
import { Picker } from "@react-native-picker/picker";

interface WaterSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (settings: { dailyGoal: number; increment: number }) => void;
  currentDailyGoal: number;
  currentIncrement: number;
}

export const WaterSettingsModal: React.FC<WaterSettingsModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  currentDailyGoal,
  currentIncrement,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [dailyGoal, setDailyGoal] = useState(currentDailyGoal.toString());
  const [increment, setIncrement] = useState(currentIncrement.toString());

  const handleSave = () => {
    onSubmit({
      dailyGoal: parseInt(dailyGoal, 10),
      increment: parseInt(increment, 10),
    });
    onClose();
  };

  // Generate values for the pickers
  const dailyGoalValues = Array.from({ length: 16 }, (_, i) =>
    ((i + 1) * 8).toString()
  ); // 8 to 128 fl oz
  const incrementValues = [4, 8, 12, 16, 20, 24, 32].map(String); // Common increment values

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.modalBackground },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <SmallTextButton onPress={onClose}>
              <ThemedText style={[styles.cancelText, { color: theme.red }]}>
                Cancel
              </ThemedText>
            </SmallTextButton>
            <ThemedText type="title" style={styles.title}>
              Water Settings
            </ThemedText>
            <View style={styles.placeholder} />
          </View>

          {/* Daily Goal Picker */}
          <View style={styles.pickerSection}>
            <ThemedText style={styles.pickerLabel}>Daily Goal</ThemedText>
            <View
              style={[
                styles.pickerContainer,
                { backgroundColor: theme.buttonBackground },
              ]}
            >
              <Picker
                selectedValue={dailyGoal}
                onValueChange={(itemValue: string) => setDailyGoal(itemValue)}
                style={[styles.picker, { color: theme.text }]}
              >
                {dailyGoalValues.map((value) => (
                  <Picker.Item
                    key={value}
                    label={`${value} fl. oz.`}
                    value={value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Increment Picker */}
          <View style={styles.pickerSection}>
            <ThemedText style={styles.pickerLabel}>Increment Amount</ThemedText>
            <View
              style={[
                styles.pickerContainer,
                { backgroundColor: theme.buttonBackground },
              ]}
            >
              <Picker
                selectedValue={increment}
                onValueChange={(itemValue: string) => setIncrement(itemValue)}
                style={[styles.picker, { color: theme.text }]}
              >
                {incrementValues.map((value) => (
                  <Picker.Item
                    key={value}
                    label={`${value} fl. oz.`}
                    value={value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Save Button */}
          <DefaultButton
            onPress={handleSave}
            defaultColor={theme.yellow}
            defaultTextColor={theme.white}
            style={styles.saveButton}
          >
            Save Changes
          </DefaultButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    paddingBottom: 200,
    height: "75%",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "500",
  },
  placeholder: {
    width: 50,
  },
  pickerSection: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  pickerContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  picker: {
    height: 175,
  },
  saveButton: {
    bottom: 0,
  },
});
