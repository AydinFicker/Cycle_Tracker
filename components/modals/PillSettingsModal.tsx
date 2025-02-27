import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  useColorScheme,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Switch,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { DefaultButton } from "../buttons/DefaultButton";
import { SmallTextButton } from "../buttons/SmallTextButton";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, parse } from "date-fns";
import type { Pill } from "../logging/PillSection";

interface PillSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (pillData: {
    name: string;
    intakes: number;
    reminderTimes: (string | null)[];
  }) => void;
  onDelete?: (pillName: string) => void;
  initialValues?: {
    name: string;
    intakes: number;
    reminderTimes: (string | null)[];
  };
}

export const PillSettingsModal: React.FC<PillSettingsModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  onDelete,
  initialValues,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [name, setName] = useState(initialValues?.name ?? "");
  const [intakes, setIntakes] = useState(initialValues?.intakes ?? 1);
  const [reminderTimes, setReminderTimes] = useState<(string | null)[]>(
    initialValues?.reminderTimes ?? [null]
  );
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  // Reset state when initialValues changes
  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setIntakes(initialValues.intakes);
      setReminderTimes(initialValues.reminderTimes);
    } else {
      setName("");
      setIntakes(1);
      setReminderTimes([null]);
    }
  }, [initialValues]);

  // Update reminder times array when intakes change
  useEffect(() => {
    setReminderTimes((prev) => {
      const newTimes = [...prev];
      if (intakes > prev.length) {
        // Add new times
        for (let i = prev.length; i < intakes; i++) {
          newTimes.push("12:00");
        }
      } else if (intakes < prev.length) {
        // Remove extra times
        newTimes.splice(intakes);
      }
      return newTimes;
    });
  }, [intakes]);

  const handleSave = () => {
    const trimmedName = name.trim();
    if (trimmedName) {
      onSubmit({
        name: trimmedName,
        intakes,
        reminderTimes: remindersEnabled
          ? reminderTimes
          : reminderTimes.map(() => null),
      });
      // Reset state
      setName("");
      setIntakes(1);
      setReminderTimes(["12:00"]);
      setRemindersEnabled(true);
      onClose();
    }
  };

  const handleIntakeChange = (increment: number) => {
    setIntakes((prev) => Math.max(1, Math.min(prev + increment, 5)));
  };

  const handleTimePress = (index: number) => {
    setSelectedTimeIndex(index);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setReminderTimes((prev) => {
        const newTimes = [...prev];
        newTimes[selectedTimeIndex] = format(selectedDate, "HH:mm");
        return newTimes;
      });
    }
  };

  const handleRemoveReminder = (index: number) => {
    setReminderTimes((prev) => {
      const newTimes = [...prev];
      newTimes[index] = null;
      return newTimes;
    });
  };

  const toggleReminders = () => {
    setRemindersEnabled((prev) => !prev);
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
          <View style={styles.header}>
            <View style={styles.headerLeftButton}>
              <SmallTextButton onPress={onClose}>
                <ThemedText style={[styles.cancelText, { color: theme.red }]}>
                  Cancel
                </ThemedText>
              </SmallTextButton>
            </View>
            <ThemedText type="title" style={styles.title}>
              {initialValues ? "Edit Pill" : "Add Pill"}
            </ThemedText>
            <View style={styles.headerRightPlaceholder} />
          </View>

          <ScrollView>
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
                placeholderTextColor={theme.darkgrey}
              />
            </View>

            {/* Intake Number */}
            <View style={styles.inputSection}>
              <ThemedText style={styles.label}>Number of Intakes</ThemedText>
              <View style={styles.intakeContainer}>
                <TouchableOpacity
                  onPress={() => handleIntakeChange(-1)}
                  style={[
                    styles.intakeButton,
                    { backgroundColor: theme.buttonBackground },
                  ]}
                  disabled={intakes <= 1}
                >
                  <Ionicons
                    name="remove"
                    size={24}
                    color={intakes <= 1 ? theme.darkgrey : theme.text}
                  />
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
                  <Ionicons
                    name="add"
                    size={24}
                    color={intakes >= 5 ? theme.darkgrey : theme.text}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Reminder Times */}
            <View style={styles.inputSection}>
              <View style={styles.reminderHeader}>
                <ThemedText style={styles.label}>Reminders</ThemedText>
                <Switch
                  value={remindersEnabled}
                  onValueChange={toggleReminders}
                  trackColor={{ false: theme.darkgrey, true: theme.yellow }}
                  thumbColor={theme.white}
                />
              </View>
              {remindersEnabled && (
                <View style={styles.reminderTimesContainer}>
                  {reminderTimes.map((time, index) => (
                    <View key={index} style={styles.reminderTimeContainer}>
                      {time === null ? (
                        <TouchableOpacity
                          onPress={() => handleTimePress(index)}
                          style={[
                            styles.timeButton,
                            styles.addReminderButton,
                            { backgroundColor: theme.buttonBackground },
                          ]}
                        >
                          <Ionicons name="add" size={24} color={theme.blue} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleTimePress(index)}
                          style={[
                            styles.timeButton,
                            { backgroundColor: theme.buttonBackground },
                          ]}
                        >
                          <ThemedText>
                            {format(parse(time, "HH:mm", new Date()), "h:mm a")}
                          </ThemedText>
                        </TouchableOpacity>
                      )}
                      {!reminderTimes[index] === false && (
                        <TouchableOpacity
                          onPress={() => handleRemoveReminder(index)}
                          style={styles.removeButton}
                        >
                          <Ionicons
                            name={
                              time === null ? "close-circle" : "close-circle"
                            }
                            size={24}
                            color={theme.red}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            {onDelete && (
              <DefaultButton
                onPress={() => {
                  onDelete(name);
                }}
                defaultColor={theme.red}
                defaultTextColor={theme.white}
                style={styles.deleteButton}
              >
                Delete Pill
              </DefaultButton>
            )}
            <DefaultButton
              onPress={handleSave}
              defaultColor={theme.yellow}
              defaultTextColor={theme.white}
              style={styles.saveButton}
            >
              {initialValues ? "Save Changes" : "Add Pill"}
            </DefaultButton>
          </View>

          {/* Time Picker */}
          {showTimePicker && Platform.OS === "ios" && (
            <View
              style={[
                styles.timePickerContainer,
                { backgroundColor: theme.modalBackground },
              ]}
            >
              <DateTimePicker
                value={
                  reminderTimes[selectedTimeIndex]
                    ? new Date(`2000-01-01T${reminderTimes[selectedTimeIndex]}`)
                    : new Date()
                }
                mode="time"
                display="spinner"
                onChange={handleTimeChange}
              />
            </View>
          )}
          {showTimePicker && Platform.OS === "android" && (
            <DateTimePicker
              value={
                reminderTimes[selectedTimeIndex]
                  ? new Date(`2000-01-01T${reminderTimes[selectedTimeIndex]}`)
                  : new Date()
              }
              mode="time"
              display="default"
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  headerLeftButton: {
    width: 100,
    alignItems: "flex-start",
  },
  headerRightPlaceholder: {
    width: 100,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    flex: 1,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "500",
  },
  inputSection: {
    marginBottom: 20,
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
  intakeContainer: {
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
  reminderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reminderTimesContainer: {
    gap: 12,
  },
  reminderTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  timeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  addReminderButton: {
    borderWidth: 2,
    borderColor: Colors.light.blue,
    borderStyle: "dashed",
  },
  buttonContainer: {
    gap: 12,
    marginTop: 20,
  },
  deleteButton: {
    marginTop: 8,
  },
  saveButton: {
    marginBottom: 20,
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
  removeButton: {
    padding: 4,
  },
});
