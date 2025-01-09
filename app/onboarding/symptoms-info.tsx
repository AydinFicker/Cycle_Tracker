import { StyleSheet, useColorScheme, View } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { MultiSelectButton } from "@/components/buttons/MultiSelectButton";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { LoadingTopBar } from "@/components/LoadingTopBar";

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

  const handleContinue = () => {
    router.push("/(tabs)");
  };

  return (
    <ThemedView style={styles.container}>
      <LoadingTopBar progress={50} style={styles.progressBar} />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Do you experience any of the following symptoms during your period?
        </ThemedText>

        {SYMPTOMS.map((symptom) => (
          <MultiSelectButton
            key={symptom}
            onPress={() => toggleSymptom(symptom)}
            isSelected={selectedSymptoms.includes(symptom)}
          >
            {symptom}
          </MultiSelectButton>
        ))}

        <DefaultButton
          onPress={handleContinue}
          style={styles.continueButton}
          defaultColor={theme.yellow}
          defaultTextColor={theme.white}
        >
          Continue
        </DefaultButton>
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
