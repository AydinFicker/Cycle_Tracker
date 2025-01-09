import { StyleSheet, useColorScheme, View } from "react-native";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function StartScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.flowersContainer}>
        <Ionicons
          name="flower"
          size={175}
          style={[
            styles.flower,
            { opacity: 0.35, top: 0, left: -90, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={120}
          style={[
            styles.flower,
            { opacity: 0.25, top: 50, left: 75, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={45}
          style={[
            styles.flower,
            { opacity: 0.1, top: 160, left: 45, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={80}
          style={[
            styles.flower,
            { opacity: 0.15, top: 180, left: 160, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={50}
          style={[
            styles.flower,
            { opacity: 0.05, top: 250, left: 80, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={80}
          style={[
            styles.flower,
            { opacity: 0.15, top: 200, left: -30, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={50}
          style={[
            styles.flower,
            { opacity: 1, top: 270, left: 260, color: theme.red },
          ]}
        />
      </View>

      <View style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>
          twenty eight
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          get a track of your cycle
        </ThemedText>
      </View>

      <DefaultButton
        onPress={() => router.push("/onboarding/cycle-info")}
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
  flowersContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    height: 200,
  },
  flower: {
    position: "absolute",
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
