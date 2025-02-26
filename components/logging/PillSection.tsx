import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { PillSettingsModal } from "../modals/PillSettingsModal";
import { PillListModal } from "../modals/PillListModal";

export interface Pill {
  id: string;
  name: string;
  intakes: number;
  intakeNumber: number;
  reminderTimes: (string | null)[];
  taken: boolean;
}

interface PillSectionProps {
  pills: Pill[];
  onPillAdd: (pill: {
    name: string;
    intakes: number;
    reminderTimes: (string | null)[];
  }) => void;
  onPillTake: (pillId: string) => void;
  onPillsUpdate: (updatedPills: Pill[]) => void;
}

export const PillSection: React.FC<PillSectionProps> = ({
  pills,
  onPillAdd,
  onPillTake,
  onPillsUpdate,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isListModalVisible, setIsListModalVisible] = useState(false);
  const [selectedPill, setSelectedPill] = useState<Pill | null>(null);

  const handleAddPill = () => {
    setSelectedPill(null);
    setIsSettingsModalVisible(true);
  };

  const handleEditPill = (pill: Pill) => {
    setSelectedPill(pill);
    setIsSettingsModalVisible(true);
    setIsListModalVisible(false); // Close list modal when editing
  };

  const handlePillSubmit = (pillData: {
    name: string;
    intakes: number;
    reminderTimes: (string | null)[];
  }) => {
    if (selectedPill) {
      // Update all pills with the same base name
      const baseName = selectedPill.name;
      const updatedPills = pills.map((pill) => {
        if (pill.name === baseName) {
          return {
            ...pill,
            name: pillData.name,
            intakes: pillData.intakes,
            reminderTimes: pillData.reminderTimes,
          };
        }
        return pill;
      });
      onPillsUpdate(updatedPills);
    } else {
      onPillAdd(pillData);
    }
    setIsSettingsModalVisible(false);
    setSelectedPill(null);
  };

  const handlePillPress = (pillId: string) => {
    const pill = pills.find((p) => p.id === pillId);
    if (!pill) return;

    if (pill.reminderTimes.some((time) => time !== null)) {
      onPillTake(pillId);
    } else {
      setSelectedPill(pill);
      setIsSettingsModalVisible(true);
    }
  };

  const handlePillDelete = (pillName: string) => {
    const updatedPills = pills.filter((pill) => pill.name !== pillName);
    onPillsUpdate(updatedPills);
    setIsSettingsModalVisible(false);
    setSelectedPill(null);
  };

  const handlePillsReorder = (reorderedPills: Pill[]) => {
    onPillsUpdate(reorderedPills);
  };

  const groupedPills = pills.reduce<{ [key: string]: Pill[] }>((acc, pill) => {
    const baseName = pill.name;
    if (!acc[baseName]) {
      acc[baseName] = [];
    }
    acc[baseName].push(pill);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <View
        style={[styles.contentContainer, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="medical" size={24} color={theme.red} />
            <ThemedText style={styles.title}>Pills</ThemedText>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() => setIsListModalVisible(true)}
              style={styles.iconButton}
            >
              <Ionicons name="settings-outline" size={24} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddPill} style={styles.iconButton}>
              <Ionicons name="add" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ThemedText style={styles.description}>Log your daily pills</ThemedText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pillsContainer}
          contentContainerStyle={styles.pillsContentContainer}
        >
          {Object.entries(groupedPills).map(([baseName, pills]) => (
            <View key={baseName} style={styles.pillGroup}>
              <View style={styles.pillNameContainer}>
                <ThemedText style={styles.pillName}>{baseName}</ThemedText>
                <ThemedText style={styles.pillCount}>
                  {pills.length > 1 ? `${pills.length} intakes` : "1 intake"}
                </ThemedText>
              </View>
              <View style={styles.pillButtonsContainer}>
                {pills.map((pill) => (
                  <TouchableOpacity
                    key={pill.id}
                    style={[
                      styles.pillButton,
                      {
                        backgroundColor: pill.taken
                          ? theme.red
                          : theme.buttonBackground,
                      },
                    ]}
                    onPress={() => handlePillPress(pill.id)}
                  >
                    <Ionicons
                      name={pill.taken ? "checkmark" : "medical"}
                      size={24}
                      color={pill.taken ? theme.white : theme.text}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        <PillSettingsModal
          isVisible={isSettingsModalVisible}
          onClose={() => {
            setIsSettingsModalVisible(false);
            setSelectedPill(null);
          }}
          onSubmit={handlePillSubmit}
          onDelete={selectedPill ? handlePillDelete : undefined}
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

        <PillListModal
          isVisible={isListModalVisible}
          onClose={() => setIsListModalVisible(false)}
          pills={pills}
          onPillEdit={handleEditPill}
          onPillDelete={handlePillDelete}
          onPillsReorder={handlePillsReorder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  contentContainer: {
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  description: {
    opacity: 0.7,
    marginBottom: 16,
  },
  pillsContainer: {
    marginHorizontal: -16,
  },
  pillsContentContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  pillGroup: {
    minWidth: 120,
  },
  pillNameContainer: {
    marginBottom: 8,
  },
  pillName: {
    fontSize: 16,
    fontWeight: "600",
  },
  pillCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  pillButtonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  pillButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  intakeNumber: {
    position: "absolute",
    bottom: 2,
    fontSize: 10,
    fontWeight: "500",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});
