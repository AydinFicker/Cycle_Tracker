import { StyleSheet, useColorScheme, View, ScrollView } from "react-native";
import { useState, useCallback } from "react";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { DropdownButton } from "@/components/buttons/DropdownButton";
import { LoadingTopBar } from "@/components/onboarding/LoadingTopBar";
import { SkipButton } from "@/components/onboarding/skip";
import { NextButton } from "@/components/onboarding/next";
import { BackButton } from "@/components/onboarding/back";

const HEALTH_CONDITIONS = ["Endometriosis", "PCOS", "Fibroids", "Other"];

export default function HealthInfoScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState("");
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const handleConditionSelect = useCallback((condition: string) => {
    console.log("HealthInfoScreen - condition selected:", condition);
    setSelectedCondition(condition);
  }, []);

  console.log("Current selected condition:", selectedCondition);

  return (
    <ThemedView style={styles.container}>
      <LoadingTopBar progress={75} style={styles.progressBar} />
      <SkipButton href="/(tabs)" />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Do you have any reproductive health disorders?
        </ThemedText>

        <ScrollView>
          <DefaultButton
            onPress={() => {
              console.log("Yes selected");
              setSelectedOption("yes");
            }}
            isSelected={selectedOption === "yes"}
          >
            Yes
          </DefaultButton>

          <DefaultButton
            onPress={() => {
              console.log("No selected");
              setSelectedOption("no");
              setSelectedCondition("");
            }}
            isSelected={selectedOption === "no"}
          >
            No
          </DefaultButton>

          <DefaultButton
            onPress={() => {
              console.log("Not sure selected");
              setSelectedOption("unsure");
              setSelectedCondition("");
            }}
            isSelected={selectedOption === "unsure"}
          >
            Not sure
          </DefaultButton>

          {selectedOption === "yes" && (
            <DropdownButton
              value={selectedCondition}
              onSelect={handleConditionSelect}
              options={HEALTH_CONDITIONS}
            />
          )}
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
});
