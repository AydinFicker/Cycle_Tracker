import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { SmallTextButton } from "../buttons/SmallTextButton";
import { DefaultButton } from "../buttons/DefaultButton";
import { Ionicons } from "@expo/vector-icons";
import { Pill } from "../logging/PillSection";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, parse } from "date-fns";
import { Platform } from "react-native";

interface PillEditModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (pillData: {
    name: string;
    intakes: number;
    reminderTimes: (string | null)[];
  }) => void;
  onDelete: (pillName: string) => void;
  pills: Pill[];
  selectedPill: Pill | null;
  onPillSelect: (pill: Pill) => void;
}

export const PillEditModal: React.FC<PillEditModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  onDelete,
  pills,
  selectedPill,
  onPillSelect,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [name, setName] = useState(selectedPill?.name ?? "");
  const [intakes, setIntakes] = useState(selectedPill?.intakes ?? 1);
  const [reminderTimes, setReminderTimes] = useState<(string | null)[]>(
    selectedPill?.reminderTimes ?? [null]
  );
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);

  // Reset state when selected pill changes
  React.useEffect(() => {
    if (selectedPill) {
      setName(selectedPill.name);
      setIntakes(selectedPill.intakes);
      setReminderTimes(selectedPill.reminderTimes);
    }
  }, [selectedPill]);

  const handleTimePress = (index: number) => {
    setSelectedTimeIndex(index);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedDate) {
      const timeString = format(selectedDate, "HH:mm");
      const newReminderTimes = [...reminderTimes];
      newReminderTimes[selectedTimeIndex] = timeString;
      setReminderTimes(newReminderTimes);
    }
  };

  const handleRemoveReminder = (index: number) => {
    const newReminderTimes = [...reminderTimes];
    newReminderTimes[index] = null;
    setReminderTimes(newReminderTimes);
  };

  const handleSave = () => {
    if (!selectedPill) return;
    onSubmit({
      name,
      intakes,
      reminderTimes,
    });
  };

  const handleDelete = () => {
    if (!selectedPill) return;
    onDelete(selectedPill.name);
    onClose();
  };

  // Group pills by name
  const uniquePills = pills.reduce<{ [key: string]: Pill }>((acc, pill) => {
    if (!acc[pill.name]) {
      acc[pill.name] = pill;
    }
    return acc;
  }, {});

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
              Edit Pills
            </ThemedText>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.scrollContent}>
            {/* Pills List */}
            {Object.values(uniquePills).map((pill) => (
              <TouchableOpacity
                key={pill.name}
                style={[
                  styles.pillItem,
                  {
                    backgroundColor: theme.buttonBackground,
                    borderColor:
                      selectedPill?.name === pill.name
                        ? theme.blue
                        : "transparent",
                  },
                ]}
                onPress={() => onPillSelect(pill)}
              >
                <View style={styles.pillInfo}>
                  <ThemedText style={styles.pillName}>{pill.name}</ThemedText>
                  <ThemedText style={styles.pillDetails}>
                    {pill.intakes} intake{pill.intakes > 1 ? "s" : ""}
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={24} color={theme.text} />
              </TouchableOpacity>
            ))}

            {/* Edit Section */}
            {selectedPill && (
              <View style={styles.editSection}>
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
                      <TouchableOpacity
                        onPress={() => handleRemoveReminder(index)}
                        style={styles.removeButton}
                      >
                        <Ionicons
                          name="close-circle"
                          size={24}
                          color={theme.red}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                {/* Delete Button */}
                <DefaultButton
                  onPress={handleDelete}
                  defaultColor={theme.red}
                  defaultTextColor={theme.white}
                  style={styles.deleteButton}
                >
                  Delete Pill
                </DefaultButton>

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
            )}
          </ScrollView>

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
                    ? parse(
                        reminderTimes[selectedTimeIndex]!,
                        "HH:mm",
                        new Date()
                      )
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
                  ? parse(
                      reminderTimes[selectedTimeIndex]!,
                      "HH:mm",
                      new Date()
                    )
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
    width: "100%",
    height: "90%",
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
  scrollContent: {
    flex: 1,
  },
  pillItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
  },
  pillInfo: {
    flex: 1,
  },
  pillName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  pillDetails: {
    opacity: 0.7,
  },
  editSection: {
    marginTop: 20,
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
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addReminderButton: {
    borderWidth: 2,
    borderColor: Colors.light.blue,
    borderStyle: "dashed",
  },
  removeButton: {
    padding: 4,
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
  deleteButton: {
    marginTop: 32,
  },
  saveButton: {
    marginTop: 12,
  },
});
