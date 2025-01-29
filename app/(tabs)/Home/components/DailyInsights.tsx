import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { PillVertical } from "@/components/PillVertical";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface DailyInsightsProps {
  onAddInfoPress: () => void;
}

const DailyInsights: React.FC<DailyInsightsProps> = ({ onAddInfoPress }) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const handleAddPress = () => {
    console.log("DailyInsights: Add Info pressed");
    onAddInfoPress();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Your Daily Insights
        </ThemedText>
        <View
          style={[styles.divider, { backgroundColor: theme.tabIconDefault }]}
        />
      </View>

      <View style={styles.pillsContainer}>
        <PillVertical
          title="Cycle day"
          backgroundColor={theme.red}
          titleColor={theme.white}
          href="/(tabs)/Home/cycleInsights"
        >
          <ThemedText
            type="title"
            style={[styles.pillContent, { color: theme.white }]}
          >
            18
          </ThemedText>
        </PillVertical>

        <PillVertical
          title="Ovulation Day"
          backgroundColor={theme.blue}
          titleColor={theme.white}
          href="/(tabs)/Home/ovulationDetails"
        >
          <ThemedText
            type="title"
            style={[styles.pillContent, { color: theme.white }]}
          >
            3
          </ThemedText>
        </PillVertical>

        <PillVertical
          title="Symptoms"
          backgroundColor={theme.buttonBackground}
          href="/(tabs)/Home/symptomDetails"
        >
          <View style={styles.symptomsContainer}>
            <View style={[styles.symptomIcon, { backgroundColor: theme.red }]}>
              <Ionicons name="heart" size={16} color={theme.white} />
            </View>
            <View style={[styles.symptomIcon, { backgroundColor: theme.blue }]}>
              <Ionicons name="add" size={16} color={theme.white} />
            </View>
          </View>
        </PillVertical>

        <PillVertical
          title="Add Info"
          backgroundColor={theme.yellow}
          titleColor={theme.white}
          onPress={handleAddPress}
        >
          <Ionicons name="add" size={32} color={theme.white} />
        </PillVertical>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    width: "100%",
    opacity: 0.5,
  },
  pillsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  symptomsContainer: {
    flexDirection: "row",
    gap: 4,
    paddingTop: 12,
  },
  symptomIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pillContent: {
    fontSize: 32,
    paddingTop: 6,
  },
});

export default DailyInsights;
