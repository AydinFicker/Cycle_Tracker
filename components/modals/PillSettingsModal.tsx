import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  useColorScheme,
  TextInput,
  ScrollView,
  TouchableOpacity,
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
  onSubmit: (pillData: Omit<Pill, "id" | "taken">) => void;
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
  const [reminderTimes, setReminderTimes] = useState<Date[]>([new Date()]);
  const [selectedIcon, setSelectedIcon] = useState<Pill["icon"]>("pill");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeTimeIndex, setActiveTimeIndex] = useState(0);

  const handleSave = () => {
    if (!name) return;

    onSubmit({
      name,
      intakes,
      reminderTimes: reminderTimes.map((time) => format(time, "HH:mm")),
      icon: selectedIcon,
      intakeNumber: 1,
    });

    // Reset form
    setName("");
    setIntakes(1);
    setReminderTimes([new Date()]);
    setSelectedIcon("pill");
  };

  const handleIntakeChange = (increment: number) => {
    const newIntakes = Math.max(1, intakes + increment);
    setIntakes(newIntakes);

    // Adjust reminder times array
    if (newIntakes > reminderTimes.length) {
      setReminderTimes([...reminderTimes, new Date()]);
    } else {
      setReminderTimes(reminderTimes.slice(0, newIntakes));
    }
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      const newTimes = [...reminderTimes];
      newTimes[activeTimeIndex] = selectedDate;
      setReminderTimes(newTimes);
    }
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
          </View>

          <ScrollView style={styles.form}>
            {/* Pill Name */}
            <View style={styles.inputGroup}>
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
                placeholderTextColor={theme.darkgrey}
              />
            </View>

            {/* Pill Icon Selection */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Pill Type</ThemedText>
              <View style={styles.iconGrid}>
                {PILL_ICONS.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconButton,
                      {
                        backgroundColor: theme.buttonBackground,
                        borderColor:
                          selectedIcon === icon ? theme.blue : "transparent",
                      },
                    ]}
                    onPress={() => setSelectedIcon(icon)}
                  >
                    <Ionicons
                      name={icon === "pill" ? "medical" : "medical-outline"}
                      size={24}
                      color={theme.blue}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Number of Intakes */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Number of Intakes</ThemedText>
              <View style={styles.intakeControls}>
                <TouchableOpacity
                  style={[
                    styles.intakeButton,
                    { backgroundColor: theme.buttonBackground },
                  ]}
                  onPress={() => handleIntakeChange(-1)}
                  disabled={intakes <= 1}
                >
                  <Ionicons name="remove" size={24} color={theme.text} />
                </TouchableOpacity>
                <ThemedText style={styles.intakeCount}>{intakes}</ThemedText>
                <TouchableOpacity
                  style={[
                    styles.intakeButton,
                    { backgroundColor: theme.buttonBackground },
                  ]}
                  onPress={() => handleIntakeChange(1)}
                >
                  <Ionicons name="add" size={24} color={theme.text} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Reminder Times */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Reminder Times</ThemedText>
              {reminderTimes.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeButton,
                    { backgroundColor: theme.buttonBackground },
                  ]}
                  onPress={() => {
                    setActiveTimeIndex(index);
                    setShowTimePicker(true);
                  }}
                >
                  <ThemedText>{format(time, "h:mm a")}</ThemedText>
                </TouchableOpacity>
              ))}
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

          {showTimePicker && (
            <DateTimePicker
              value={reminderTimes[activeTimeIndex]}
              mode="time"
              is24Hour={false}
              onChange={handleTimeChange}
            />
          )}
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
  },
  modalContent: {
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    flex: 1,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "500",
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
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
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  intakeControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  intakeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  intakeCount: {
    fontSize: 20,
    fontWeight: "600",
  },
  timeButton: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    justifyContent: "center",
  },
  saveButton: {
    marginTop: 16,
  },
});
