import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { router } from "expo-router";
import { Header } from "@/components/Header";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Header title="Home" showBackButton={false} />

        <ScrollView style={styles.buttonContainer}>
          <DefaultButton
            onPress={() => router.push("/Home/cycleInsights")}
            style={styles.button}
          >
            Cycle Insights
          </DefaultButton>

          <DefaultButton
            onPress={() => router.push("/Home/ovulationDetails")}
            style={styles.button}
          >
            Ovulation Details
          </DefaultButton>

          <DefaultButton
            onPress={() => router.push("/Home/symptomDetails")}
            style={styles.button}
          >
            Symptom Details
          </DefaultButton>
        </ScrollView>
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
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  title: {
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    marginBottom: 16,
  },
});
