import React, { useState } from "react";
import { Modal, View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { LOGGING_CATEGORIES } from "@/constants/LoggingOptions";
import { TestType } from "@/types/logging";
import { SmallTextButton } from "../buttons/SmallTextButton";
import { DefaultButton } from "../buttons/DefaultButton";

interface OvulationTestModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: { testTypeId: string; resultId: string }) => void;
}

export const OvulationTestModal: React.FC<OvulationTestModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [selectedTestType, setSelectedTestType] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  // Get the test options from the logging categories
  const testOptions =
    LOGGING_CATEGORIES.find((cat) => cat.id === "ovulation_test")?.options.find(
      (opt) => opt.id === "log_test"
    )?.modalConfig?.options || {};

  const handleSave = () => {
    if (selectedTestType && selectedResult) {
      onSubmit({
        testTypeId: selectedTestType,
        resultId: selectedResult,
      });
      onClose();
      // Reset state after closing
      setSelectedTestType(null);
      setSelectedResult(null);
    }
  };

  const handleCancel = () => {
    onClose();
    setSelectedTestType(null);
    setSelectedResult(null);
  };

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
          <ThemedText type="title" style={styles.title}>
            Log Ovulation Test
          </ThemedText>

          {/* Test Type Selection */}
          <View style={styles.section}>
            <ThemedText style={styles.subtitle}>Test Type</ThemedText>
            <View style={styles.optionsContainer}>
              {Object.values(testOptions).map((testType: TestType) => (
                <Pressable
                  key={testType.id}
                  style={[
                    styles.option,
                    selectedTestType === testType.id && styles.selectedOption,
                    { borderColor: theme.text },
                  ]}
                  onPress={() => {
                    setSelectedTestType(testType.id);
                    setSelectedResult(null); // Reset result when changing test type
                  }}
                >
                  <ThemedText>{testType.label}</ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Result Selection */}
          {selectedTestType && (
            <View style={styles.section}>
              <ThemedText style={styles.subtitle}>Result</ThemedText>
              <View style={styles.optionsContainer}>
                {testOptions[selectedTestType].results.map((result) => (
                  <Pressable
                    key={result.id}
                    style={[
                      styles.option,
                      selectedResult === result.id && styles.selectedOption,
                      { borderColor: theme.text },
                    ]}
                    onPress={() => setSelectedResult(result.id)}
                  >
                    <ThemedText>{result.label}</ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Buttons */}
          <SmallTextButton onPress={handleCancel}>
            <ThemedText style={styles.cancelText}>Cancel</ThemedText>
          </SmallTextButton>
          <DefaultButton
            onPress={handleSave}
            defaultColor={theme.yellow}
            defaultTextColor={theme.white}
          >
            Save
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionsContainer: {
    gap: 10,
  },
  option: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  selectedOption: {
    opacity: 0.8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  cancelText: {
    fontSize: 16,
    opacity: 0.7,
  },
});
