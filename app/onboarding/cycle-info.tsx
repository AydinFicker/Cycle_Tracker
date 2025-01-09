import { StyleSheet, useColorScheme, View } from "react-native";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function CycleInfoScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const handleContinue = () => {
    if (selectedOption) {
      router.push("/(tabs)");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Is your cycle regular?
        </ThemedText>

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

        <DefaultButton
          onPress={handleContinue}
          style={[styles.continueButton, { opacity: selectedOption ? 1 : 0.5 }]}
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
