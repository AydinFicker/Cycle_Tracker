import { StyleSheet, View, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

export default function HomeIndexScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.content}>
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
});
