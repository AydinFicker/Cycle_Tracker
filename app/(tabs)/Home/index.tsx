import { StyleSheet, useColorScheme, View, ScrollView } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { LoadingTopBar } from "@/components/onboarding/LoadingTopBar";
import { router } from "expo-router";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Main Home Screen
        </ThemedText>

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
