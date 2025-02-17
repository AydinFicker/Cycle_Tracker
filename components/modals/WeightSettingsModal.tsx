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

interface WeightSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (weight: number | null, unit: "lbs" | "kg") => void;
  currentWeight: number | null;
  currentUnit: "lbs" | "kg";
}

export const WeightSettingsModal: React.FC<WeightSettingsModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  currentWeight = 60,
  currentUnit = "kg",
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [selectedUnit, setSelectedUnit] = useState<"lbs" | "kg">(currentUnit);
  const [wholeNumber, setWholeNumber] = useState("0");
  const [decimal, setDecimal] = useState("0");

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
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.modalBackground },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.placeholder} />
            <ThemedText type="title" style={styles.title}>
              Log your weight
            </ThemedText>
            <TouchableOpacity onPress={handleReset} style={styles.trashButton}>
              <Ionicons name="trash-outline" size={24} color={theme.red} />
            </TouchableOpacity>
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
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  placeholder: {
    width: 40,
  },
  trashButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
    width: 80,
    height: 150,
  },
  decimal: {
    fontSize: 24,
    fontWeight: "600",
  },
  saveButton: {
    marginTop: 20,
  },
});
