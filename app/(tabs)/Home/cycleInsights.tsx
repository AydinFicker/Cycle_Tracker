import { StyleSheet, Text } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CycleInsightsScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text style={styles.textMassive}>cycles </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  textMassive: {
    fontSize: 36,
    marginBottom: 24,
    color: "#442393",
  },
});
