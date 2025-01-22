import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { PillVertical } from "@/components/PillVertical";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export const DailyInsights = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

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
        >
          <ThemedText
            type="title"
            style={[styles.pillContent, { color: theme.white }]}
          >
            3
          </ThemedText>
        </PillVertical>

        <PillVertical title="Symptoms" backgroundColor={theme.buttonBackground}>
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
