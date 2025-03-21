import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { DefaultButton } from "../buttons/DefaultButton";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { SmallTextButton } from "../buttons/SmallTextButton";

interface WeightSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (newWeight: number | null, newUnit: "lbs" | "kg") => void;
  currentWeight: number | null;
  currentUnit: "lbs" | "kg";
  defaultWeight?: number;
}

export const WeightSettingsModal: React.FC<WeightSettingsModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  currentWeight,
  currentUnit,
  defaultWeight = 60,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [selectedUnit, setSelectedUnit] = useState<"lbs" | "kg">(currentUnit);
  const initialWeight = currentWeight ?? defaultWeight;
  const [wholeNumber, setWholeNumber] = useState(
    Math.floor(initialWeight).toString()
  );
  const [decimal, setDecimal] = useState(
    (initialWeight % 1).toFixed(1).split(".")[1]
  );

  // Convert between lbs and kg
  const convertWeight = (
    whole: string,
    dec: string,
    fromUnit: "lbs" | "kg",
    toUnit: "lbs" | "kg"
  ) => {
    const weight = parseFloat(`${whole}.${dec}`);
    if (fromUnit === toUnit) return { whole, dec };

    const converted =
      fromUnit === "lbs"
        ? weight * 0.45359237 // lbs to kg
        : weight * 2.20462262; // kg to lbs

    const parts = converted.toFixed(1).split(".");
    return { whole: parts[0], dec: parts[1] };
  };

  useEffect(() => {
    if (currentWeight) {
      const parts = currentWeight.toFixed(1).split(".");
      setWholeNumber(parts[0]);
      setDecimal(parts[1]);
    }
  }, [currentWeight]);

  const handleUnitChange = (newUnit: "lbs" | "kg") => {
    const converted = convertWeight(
      wholeNumber,
      decimal,
      selectedUnit,
      newUnit
    );
    setWholeNumber(converted.whole);
    setDecimal(converted.dec);
    setSelectedUnit(newUnit);
  };

  const handleReset = () => {
    onSubmit(null, selectedUnit);
    onClose();
  };

  const handleSave = () => {
    const weight = parseFloat(`${wholeNumber}.${decimal}`);
    onSubmit(weight, selectedUnit);
    onClose();
  };

  // Generate picker values
  const wholeNumbers = Array.from({ length: 400 }, (_, i) => i.toString());
  const decimals = Array.from({ length: 10 }, (_, i) => i.toString());

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
              Log your weight
            </ThemedText>
          </View>

          {/* Weight Picker */}
          <View style={styles.pickerContainer}>
            <View style={styles.weightPickers}>
              <View
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.buttonBackground },
                ]}
              >
                <Picker
                  selectedValue={wholeNumber}
                  onValueChange={setWholeNumber}
                  style={[styles.picker, { color: theme.text }]}
                >
                  {wholeNumbers.map((value) => (
                    <Picker.Item key={value} label={value} value={value} />
                  ))}
                </Picker>
              </View>
              <ThemedText style={styles.decimal}>.</ThemedText>
              <View
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.buttonBackground },
                ]}
              >
                <Picker
                  selectedValue={decimal}
                  onValueChange={setDecimal}
                  style={[styles.picker, { color: theme.text }]}
                >
                  {decimals.map((value) => (
                    <Picker.Item key={value} label={value} value={value} />
                  ))}
                </Picker>
              </View>
              <View
                style={[
                  styles.pickerWrapper,
                  { backgroundColor: theme.buttonBackground },
                ]}
              >
                <Picker
                  selectedValue={selectedUnit}
                  onValueChange={handleUnitChange}
                  style={[styles.picker, { color: theme.text }]}
                >
                  <Picker.Item label="lbs" value="lbs" />
                  <Picker.Item label="kg" value="kg" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Save Button */}
          <DefaultButton
            onPress={handleSave}
            defaultColor={theme.yellow}
            defaultTextColor={theme.white}
            style={styles.saveButton}
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
  },
  modalContent: {
    width: "100%",
    height: "50%",
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
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  weightPickers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  pickerWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  picker: {
    width: 100,
    height: 150,
  },
  decimal: {
    fontSize: 24,
    fontWeight: "600",
  },
  saveButton: {
    marginVertical: 20,
  },
});
