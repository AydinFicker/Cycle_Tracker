import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemedText } from "../styles/ThemedText";
import { theme } from "../styles/theme";
import { PillSettingsModal } from "./PillSettingsModal";

const PillSection = () => {
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [selectedPill, setSelectedPill] = useState<Pill | null>(null);

  const handleAddPill = () => {
    setSelectedPill(null);
    setIsSettingsModalVisible(true);
  };

  const handleEditPill = (pill: Pill) => {
    setSelectedPill(pill);
    setIsSettingsModalVisible(true);
  };

  const handlePillSubmit = (pillData: {
    name: string;
    intakes: number;
    reminderTimes: (string | null)[];
  }) => {
    if (selectedPill) {
      // Editing existing pill
      const updatedPills = pills.map((p) =>
        p.id === selectedPill.id
          ? {
              ...p,
              ...pillData,
            }
          : p
      );
      onPillsUpdate(updatedPills);
    } else {
      // Adding new pill
      onPillAdd(pillData);
    }
    setIsSettingsModalVisible(false);
    setSelectedPill(null);
  };

  const handlePillPress = (pillId: string) => {
    const pill = pills.find((p) => p.id === pillId);
    if (pill) {
      handleEditPill(pill);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.contentContainer, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="medical" size={24} color={theme.blue} />
            <ThemedText style={styles.title}>Pills</ThemedText>
          </View>
          <TouchableOpacity onPress={handleAddPill}>
            <Ionicons name="add" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.pillsContainer}>
          {pills.map((pill) => (
            <TouchableOpacity
              key={pill.id}
              onPress={() => handlePillPress(pill.id)}
              style={[
                styles.pillButton,
                { backgroundColor: theme.buttonBackground },
              ]}
            >
              <ThemedText style={styles.pillName}>{pill.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <PillSettingsModal
        isVisible={isSettingsModalVisible}
        onClose={() => {
          setIsSettingsModalVisible(false);
          setSelectedPill(null);
        }}
        onSubmit={handlePillSubmit}
        initialValues={
          selectedPill
            ? {
                name: selectedPill.name,
                intakes: selectedPill.intakes,
                reminderTimes: selectedPill.reminderTimes,
              }
            : undefined
        }
      />
    </View>
  );
};

export default PillSection;
