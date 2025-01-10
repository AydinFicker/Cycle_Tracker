import { StyleSheet, useColorScheme, View, ScrollView } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { LoadingTopBar } from "@/components/onboarding/LoadingTopBar";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Main Home Screen
        </ThemedText>
        {/* Add your home screen content here */}
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
});
