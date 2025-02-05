import React, { useState } from "react";
import { Modal, View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { SmallTextButton } from "../buttons/SmallTextButton";
import { DefaultButton } from "../buttons/DefaultButton";
import { StripTestIcon } from "../icons/StripTestIcon";
import { DigitalTestIcon } from "../icons/DigitalTestIcon";
import { Ionicons } from "@expo/vector-icons";

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
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => {
    if (selectedTestType && !showResults) {
      setShowResults(true);
    } else if (selectedTestType && selectedResult) {
      onSubmit({
        testTypeId: selectedTestType,
        resultId: selectedResult,
      });
      // Reset state after submission
      setSelectedTestType(null);
      setSelectedResult(null);
      setShowResults(false);
      onClose();
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      setSelectedResult(null);
    } else {
      setSelectedTestType(null);
    }
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
          {/* Header */}
          <View style={styles.header}>
            <SmallTextButton onPress={selectedTestType ? handleBack : onClose}>
              <ThemedText style={[styles.cancelText, { color: theme.red }]}>
                {selectedTestType ? "Back" : "Cancel"}
              </ThemedText>
            </SmallTextButton>
            <ThemedText type="title" style={styles.title}>
              Log ovulation test
            </ThemedText>
            <View style={styles.placeholder} />
          </View>

          {/* Subtitle */}
          <ThemedText style={styles.subtitle}>
            {showResults ? "What was the result?" : "Pick the test you used"}
          </ThemedText>

          {/* Test Options or Results */}
          <View style={styles.testOptionsContainer}>
            {!showResults ? (
              // Show test type options
              <>
                <Pressable
                  style={[
                    styles.testOption,
                    selectedTestType === "strip_test" && [
                      styles.selectedOption,
                      { backgroundColor: theme.blue + "20" },
                    ],
                  ]}
                  onPress={() => setSelectedTestType("strip_test")}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: theme.background },
                    ]}
                  >
                    <StripTestIcon width={40} height={40} color={theme.blue} />
                  </View>
                  <ThemedText style={styles.optionLabel}>Strip</ThemedText>
                </Pressable>

                <Pressable
                  style={[
                    styles.testOption,
                    selectedTestType === "digital_test" && [
                      styles.selectedOption,
                      { backgroundColor: theme.blue + "20" },
                    ],
                  ]}
                  onPress={() => setSelectedTestType("digital_test")}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: theme.background },
                    ]}
                  >
                    <DigitalTestIcon
                      width={40}
                      height={40}
                      color={theme.blue}
                    />
                  </View>
                  <ThemedText style={styles.optionLabel}>Digital</ThemedText>
                </Pressable>
              </>
            ) : (
              // Show result options
              <>
                <Pressable
                  style={[
                    styles.testOption,
                    selectedResult === "positive" && [
                      styles.selectedOption,
                      { backgroundColor: theme.blue + "20" },
                    ],
                  ]}
                  onPress={() => setSelectedResult("positive")}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: theme.background },
                    ]}
                  >
                    <Ionicons name="add" size={40} color={theme.blue} />
                  </View>
                  <ThemedText style={styles.optionLabel}>Positive</ThemedText>
                </Pressable>

                <Pressable
                  style={[
                    styles.testOption,
                    selectedResult === "negative" && [
                      styles.selectedOption,
                      { backgroundColor: theme.blue + "20" },
                    ],
                  ]}
                  onPress={() => setSelectedResult("negative")}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: theme.background },
                    ]}
                  >
                    <Ionicons name="remove" size={40} color={theme.blue} />
                  </View>
                  <ThemedText style={styles.optionLabel}>Negative</ThemedText>
                </Pressable>
              </>
            )}
          </View>

          {/* Next/Save Button */}
          {(selectedTestType || selectedResult) && (
            <DefaultButton
              onPress={handleNext}
              defaultColor={theme.red}
              defaultTextColor={theme.white}
              style={styles.nextButton}
            >
              {showResults ? "Save" : "Next"}
            </DefaultButton>
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "45%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
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
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "500",
  },
  testOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 40,
  },
  testOption: {
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  selectedOption: {
    borderRadius: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  optionLabel: {
    fontSize: 16,
  },
  nextButton: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
});
