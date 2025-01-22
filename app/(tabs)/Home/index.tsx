import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/Header";
import { DailyInsights } from "./components/DailyInsights";
import { WeeklyCalendar } from "./components/WeeklyCalendar";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.greeting}>
          Good Morning, Ella!
        </ThemedText>
        <WeeklyCalendar />
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
    paddingTop: 120,
  },
  greeting: {
    fontSize: 24,
    marginBottom: 24,
  },
});
