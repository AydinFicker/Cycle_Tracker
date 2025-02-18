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

export interface Pill {
  id: string;
  name: string;
  intakes: number;
  intakeNumber: number;
  reminderTimes: string[];
  icon: "pill" | "capsule" | "tablet" | "oval";
  taken: boolean;
}

interface PillSectionProps {
  pills: Pill[];
  onPillAdd: (pill: Omit<Pill, "id" | "taken">) => void;
  onPillTake: (pillId: string) => void;
}

export const PillSection: React.FC<PillSectionProps> = ({
  pills,
  onPillAdd,
  onPillTake,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const handleAddPill = () => {
    setIsSettingsModalVisible(true);
  };

  const handlePillSubmit = (
    pillData: Omit<Pill, "id" | "taken" | "intakeNumber">
  ) => {
    // Create multiple pill instances with sequential intake numbers
    for (let i = 1; i <= pillData.intakes; i++) {
      onPillAdd({
        ...pillData,
        intakeNumber: i,
        name: pillData.name, // Keep original name without adding numbers
      });
    }
    setIsSettingsModalVisible(false);
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
            <Ionicons name="medical" size={24} color={theme.blue} />
            <ThemedText style={styles.title}>Other pills (non-OC)</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.description}>
          Log other pills you take a day
        </ThemedText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pillsContainer}
          contentContainerStyle={styles.pillsContentContainer}
        >
          {Object.entries(groupedPills).map(([baseName, pillGroup]) => (
            <View key={baseName} style={styles.pillGroup}>
              {pillGroup.map((pill) => (
                <TouchableOpacity
                  key={pill.id}
                  style={[
                    styles.pillButton,
                    { backgroundColor: theme.buttonBackground },
                    pill.taken && { backgroundColor: theme.blue + "20" },
                  ]}
                  onPress={() => onPillTake(pill.id)}
                >
                  <View style={styles.pillIcon}>
                    <Ionicons
                      name={
                        pill.icon === "pill" ? "medical" : "medical-outline"
                      }
                      size={24}
                      color={theme.blue}
                    />
                    {pill.taken && (
                      <View style={styles.checkmark}>
                        <Ionicons
                          name="checkmark-circle"
                          size={16}
                          color={theme.blue}
                        />
                      </View>
                    )}
                  </View>
                  <ThemedText style={styles.pillName}>
                    {pill.name}
                    {pillGroup.length > 1 ? ` ${pill.intakeNumber}` : ""}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <TouchableOpacity
            style={[
              styles.addPillButton,
              { backgroundColor: theme.buttonBackground },
            ]}
            onPress={handleAddPill}
          >
            <View style={styles.addPillIcon}>
              <Ionicons name="add-circle" size={24} color={theme.blue} />
            </View>
            <ThemedText style={styles.addPillText}>Add pill</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <PillSettingsModal
        isVisible={isSettingsModalVisible}
        onClose={() => setIsSettingsModalVisible(false)}
        onSubmit={handlePillSubmit}
      />
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
    flexDirection: "row",
  },
  pillsContentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  pillGroup: {
    flexDirection: "row",
    gap: 8,
    marginRight: 8,
  },
  pillButton: {
    padding: 12,
    borderRadius: 12,
    width: 100,
    alignItems: "center",
  },
  pillIcon: {
    position: "relative",
    marginBottom: 4,
  },
  checkmark: {
    position: "absolute",
    bottom: -6,
    right: -6,
    backgroundColor: "white",
    borderRadius: 10,
  },
  pillName: {
    fontSize: 14,
    textAlign: "center",
  },
  addPillButton: {
    padding: 12,
    borderRadius: 12,
    width: 100,
    alignItems: "center",
  },
  addPillIcon: {
    marginBottom: 4,
  },
  addPillText: {
    fontSize: 14,
  },
});
