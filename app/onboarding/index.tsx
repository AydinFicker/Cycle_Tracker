import { StyleSheet, useColorScheme, View } from "react-native";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IndexFlowerBackground } from "@/components/backgrounds/IndexFlowerBackground";

export default function StartScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <IndexFlowerBackground />

      <View style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>
          twenty eight
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          get a track of your cycle
        </ThemedText>
      </View>

      <DefaultButton
        onPress={() => router.push("/onboarding/sign-up")}
        style={styles.button}
        defaultColor={theme.yellow}
        defaultTextColor={theme.white}
      >
        Start Now
      </DefaultButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.6,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
});
