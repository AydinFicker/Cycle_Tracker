import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useColorScheme,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { Ionicons } from "@expo/vector-icons";

interface DatePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  maxDate?: Date; // To prevent selecting future dates
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isVisible,
  onClose,
  onDateSelect,
  maxDate = new Date(), // Default to today
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [date, setDate] = useState(new Date());
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);

  // On Android, the date picker is shown when showAndroidPicker is true
  // and is hidden after a date is selected
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowAndroidPicker(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleDone = () => {
    onDateSelect(date);
    onClose();
  };

  // On Android, show the native date picker only when showAndroidPicker is true
  // On iOS, always show it within the modal
  const renderDatePicker = () => {
    // If we're on Android and not showing the picker, return a button to show it
    if (Platform.OS === "android" && !showAndroidPicker) {
      return (
        <DefaultButton
          onPress={() => setShowAndroidPicker(true)}
          style={styles.selectDateButton}
        >
          Select Date: {date.toLocaleDateString()}
        </DefaultButton>
      );
    }

    // Otherwise, show the picker (always for iOS, or when showAndroidPicker is true for Android)
    if (Platform.OS === "ios" || showAndroidPicker) {
      return (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={maxDate}
          style={styles.datePicker}
        />
      );
    }

    return null;
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
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
            <View style={styles.headerSide}>
              {/* Empty space to balance the header */}
            </View>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>
                Select a Date
              </ThemedText>
            </View>
            <View style={[styles.headerSide, { alignItems: "flex-end" }]}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.datePickerContainer}>{renderDatePicker()}</View>

          <DefaultButton
            onPress={handleDone}
            defaultColor={theme.yellow}
            defaultTextColor={theme.white}
            style={styles.doneButton}
          >
            Done
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
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  headerSide: {
    width: 50, // Fixed width for both sides
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    padding: 8, // Increase touchable area
  },
  datePickerContainer: {
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  datePicker: {
    width: Platform.OS === "ios" ? "100%" : undefined,
  },
  doneButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  selectDateButton: {
    width: "100%",
  },
});
