import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";

export default function CycleInfoScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { theme } = useTheme();
  const colors = Colors[theme];

  const handleContinue = () => {
    if (selectedOption) {
      // Save the selection to storage/state management
      // Navigate to next onboarding screen or home
      router.push("/(tabs)");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            Is your cycle regular?
          </Text>

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
            style={[
              styles.continueButton,
              { opacity: selectedOption ? 1 : 0.5 },
            ]}
            defaultColor={colors.yellow}
            defaultTextColor={colors.white}
          >
            Continue
          </DefaultButton>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  continueButton: {
    marginTop: 30,
  },
});
