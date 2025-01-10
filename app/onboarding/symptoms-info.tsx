import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { MultiSelectButton } from "@/components/buttons/MultiSelectButton";
import { LoadingTopBar } from "@/components/onboarding/LoadingTopBar";
import { SkipButton } from "@/components/onboarding/skip";
import { NextButton } from "@/components/onboarding/next";
import { BackButton } from "@/components/onboarding/back";

const SYMPTOMS = [
  "Painful cramps",
  "Appetite changes",
  "Acne",
  "Lower back pain",
  "Mood changes",
  "Migraine",
  "Other",
];

export default function SymptomsInfoScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <LoadingTopBar progress={50} style={styles.progressBar} />
      <SkipButton href="/(tabs)" />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Do you experience any of the following symptoms during your period?
        </ThemedText>
        <ScrollView>
          {SYMPTOMS.map((symptom) => (
            <MultiSelectButton
              key={symptom}
              onPress={() => toggleSymptom(symptom)}
              isSelected={selectedSymptoms.includes(symptom)}
            >
              {symptom}
            </MultiSelectButton>
          ))}
        </ScrollView>
        <NextButton href="/(tabs)" />
        <BackButton />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    margin: 20,
    marginTop: 40,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    marginBottom: 30,
    textAlign: "center",
  },
  continueButton: {
    marginTop: 30,
  },
});
