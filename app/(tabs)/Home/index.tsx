import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/Header";
import { DailyInsights } from "./components/DailyInsights";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header title="Home" showBackButton={false} />
      <View style={styles.content}>
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
});
