import { StyleSheet, useColorScheme, View, ScrollView } from "react-native";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { LoadingTopBar } from "@/components/onboarding/LoadingTopBar";
import { SkipButton } from "@/components/onboarding/skip";
import { NextButton } from "@/components/onboarding/next";
import { BackButton } from "@/components/onboarding/back";

export default function CycleInfoScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <LoadingTopBar progress={25} style={styles.progressBar} />
      <SkipButton href="/onboarding/symptoms-info" />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Is your cycle regular?
        </ThemedText>
        <ScrollView>
          <DefaultButton
            onPress={() => setSelectedOption("regular")}
            isSelected={selectedOption === "regular"}
          >
            My cycle is regular
          </DefaultButton>

          <DefaultButton
            onPress={() => setSelectedOption("irregular")}
            isSelected={selectedOption === "irregular"}
          >
            My cycle is irregular
          </DefaultButton>

          <DefaultButton
            onPress={() => setSelectedOption("unsure")}
            isSelected={selectedOption === "unsure"}
          >
            I am not sure
          </DefaultButton>
        </ScrollView>
        <NextButton href="/onboarding/symptoms-info" />
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
