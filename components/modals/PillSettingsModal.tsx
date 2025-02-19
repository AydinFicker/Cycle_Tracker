import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  useColorScheme,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { DefaultButton } from "../buttons/DefaultButton";
import { SmallTextButton } from "../buttons/SmallTextButton";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import type { Pill } from "../logging/PillSection";

interface PillSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (pillData: {
    name: string;
    intakes: number;
    reminderTime: string | null;
    icon: "pill" | "capsule" | "tablet" | "oval";
  }) => void;
}

const PILL_ICONS: Pill["icon"][] = ["pill", "capsule", "tablet", "oval"];

export const PillSettingsModal: React.FC<PillSettingsModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [name, setName] = useState("");
  const [intakes, setIntakes] = useState(1);
  const [reminderTime, setReminderTime] = useState<string | null>("12:00");
  const [selectedIcon, setSelectedIcon] = useState<
    "pill" | "capsule" | "tablet" | "oval"
  >("pill");
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    if (name.trim()) {
      onSubmit({
        name: name.trim(),
        intakes,
        reminderTime,
        icon: selectedIcon,
      });

      // Reset form
      setName("");
      setIntakes(1);
      setReminderTime("12:00");
      setSelectedIcon("pill");
    }
  };

  const handleIntakeChange = (increment: number) => {
    setIntakes(Math.max(1, intakes + increment));
  };

  const handleTimePress = () => {
    if (reminderTime !== null) {
      setShowTimePicker(true);
    }
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      const timeString = format(selectedDate, "HH:mm");
      setReminderTime(timeString);
    }
  };

  const toggleReminder = () => {
    setReminderTime(reminderTime === null ? "12:00" : null);
  };

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
              Add Pill
            </ThemedText>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.scrollContent}>
            {/* Name Input */}
            <View style={styles.inputSection}>
              <ThemedText style={styles.label}>Pill Name</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.buttonBackground,
                    color: theme.text,
                  },
                ]}
                value={name}
                onChangeText={setName}
                placeholder="Enter pill name"
                placeholderTextColor={theme.tabIconDefault}
              />
            </View>

            {/* Intakes Input */}
            <View style={styles.inputSection}>
              <ThemedText style={styles.label}>
                Number of intakes per day
              </ThemedText>
              <View style={styles.intakeControls}>
                <TouchableOpacity
                  onPress={() => handleIntakeChange(-1)}
                  style={[
                    styles.intakeButton,
                    { backgroundColor: theme.buttonBackground },
                  ]}
                  disabled={intakes <= 1}
                >
                  <Ionicons name="remove" size={24} color={theme.text} />
                </TouchableOpacity>
                <ThemedText style={styles.intakeNumber}>{intakes}</ThemedText>
                <TouchableOpacity
                  onPress={() => handleIntakeChange(1)}
                  style={[
                    styles.intakeButton,
                    { backgroundColor: theme.buttonBackground },
                  ]}
                  disabled={intakes >= 5}
                >
                  <Ionicons name="add" size={24} color={theme.text} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Reminder Time */}
            <View style={styles.inputSection}>
              <View style={styles.reminderHeader}>
                <ThemedText style={styles.label}>Reminder Time</ThemedText>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    { backgroundColor: theme.buttonBackground },
                  ]}
                  onPress={toggleReminder}
                >
                  <Ionicons
                    name={
                      reminderTime === null
                        ? "notifications-off"
                        : "notifications"
                    }
                    size={20}
                    color={reminderTime === null ? theme.red : theme.red}
                  />
                </TouchableOpacity>
              </View>
              {reminderTime !== null && (
                <TouchableOpacity
                  style={[
                    styles.timeButton,
                    { backgroundColor: theme.buttonBackground },
                  ]}
                  onPress={handleTimePress}
                >
                  <Ionicons
                    name="time"
                    size={20}
                    color={theme.red}
                    style={styles.timeIcon}
                  />
                  <ThemedText style={styles.timeText}>
                    {reminderTime}
                  </ThemedText>
                </TouchableOpacity>
              )}
            </View>

            {/* Icon Selection */}
            <View style={styles.inputSection}>
              <ThemedText style={styles.label}>Pill Type</ThemedText>
              <View style={styles.iconContainer}>
                {PILL_ICONS.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconButton,
                      {
                        backgroundColor: theme.buttonBackground,
                        borderColor:
                          selectedIcon === icon ? theme.red : "transparent",
                      },
                    ]}
                    onPress={() => setSelectedIcon(icon)}
                  >
                    <Ionicons
                      name={
                        icon === selectedIcon ? "medical" : "medical-outline"
                      }
                      size={24}
                      color={theme.red}
                    />
                    <ThemedText style={styles.iconText}>
                      {icon.charAt(0).toUpperCase() + icon.slice(1)}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Save Button */}
          <DefaultButton
            onPress={handleSave}
            defaultColor={theme.yellow}
            defaultTextColor={theme.white}
            style={styles.saveButton}
          >
            Add Pill
          </DefaultButton>
        </View>
      </View>

      {showTimePicker && Platform.OS === "ios" ? (
        <View
          style={[
            styles.timePickerContainer,
            { backgroundColor: theme.modalBackground },
          ]}
        >
          <DateTimePicker
            value={new Date(`2000-01-01T${reminderTime}`)}
            mode="time"
            is24Hour={true}
            onChange={handleTimeChange}
            display="spinner"
          />
          <DefaultButton
            onPress={() => setShowTimePicker(false)}
            defaultColor={theme.yellow}
            defaultTextColor={theme.white}
          >
            Done
          </DefaultButton>
        </View>
      ) : (
        showTimePicker && (
          <DateTimePicker
            value={new Date(`2000-01-01T${reminderTime}`)}
            mode="time"
            is24Hour={true}
            onChange={handleTimeChange}
          />
        )
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    maxHeight: "90%",
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
  scrollContent: {
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  reminderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  intakeControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  intakeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  intakeNumber: {
    fontSize: 20,
    fontWeight: "600",
    width: 30,
    textAlign: "center",
  },
  timeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  timeIcon: {
    marginRight: 8,
  },
  timeText: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  iconButton: {
    flex: 1,
    minWidth: "45%",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
  },
  iconText: {
    fontSize: 14,
  },
  saveButton: {
    marginTop: 20,
  },
  timePickerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
