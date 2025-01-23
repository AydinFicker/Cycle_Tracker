import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { DailyInsights } from "./components/DailyInsights";
import { WeeklyCalendar } from "./components/WeeklyCalendar";
import { PeriodCountdown } from "./components/PeriodCountdown";
import { ThemedText } from "@/components/ThemedText";
import { HomeIndexBackground } from "@/components/backgrounds/HomeIndexBackground";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <HomeIndexBackground />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.greeting}>
          Good Morning, Ella!
        </ThemedText>
        <WeeklyCalendar />
        <PeriodCountdown />
        <DailyInsights />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: "25%",
  },
  greeting: {
    fontSize: 24,
    marginBottom: 24,
  },
});
