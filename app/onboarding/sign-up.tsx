import { StyleSheet, useColorScheme, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconDefaultButton } from "@/components/buttons/IconDefaultButton";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function SignUpScreen() {
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
            { opacity: 0.35, top: 0, right: -90, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={120}
          style={[
            styles.flower,
            { opacity: 0.25, top: 0, right: 90, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={45}
          style={[
            styles.flower,
            { opacity: 0.1, top: 120, right: 80, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={80}
          style={[
            styles.flower,
            { opacity: 0.15, top: 150, right: 140, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={50}
          style={[
            styles.flower,
            { opacity: 0.05, top: 240, right: 80, color: theme.text },
          ]}
        />
        <Ionicons
          name="flower"
          size={80}
          style={[
            styles.flower,
            { opacity: 0.15, top: 200, right: -30, color: theme.text },
          ]}
        />
      </View>

      <View style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>
          Sign Up
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Track your cycle with ease
        </ThemedText>

        <View style={styles.buttonContainer}>
          <IconDefaultButton
            onPress={() => router.push("/onboarding/cycle-info")}
            icon={
              <AntDesign
                name="apple1"
                size={24}
                color={colorScheme === "dark" ? "black" : "white"}
              />
            }
            defaultColor={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
            defaultTextColor={colorScheme === "dark" ? "#000000" : "#FFFFFF"}
          >
            Continue with Apple
          </IconDefaultButton>

          <IconDefaultButton
            onPress={() => router.push("/onboarding/cycle-info")}
            icon={<AntDesign name="google" size={24} color="white" />}
            defaultColor="#DB4437"
            defaultTextColor="#FFFFFF"
          >
            Continue with Google
          </IconDefaultButton>

          <IconDefaultButton
            onPress={() => router.push("/onboarding/cycle-info")}
            icon={<AntDesign name="facebook-square" size={24} color="white" />}
            defaultColor="#4267B2"
            defaultTextColor="#FFFFFF"
          >
            Continue with Facebook
          </IconDefaultButton>
        </View>
      </View>
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
    paddingTop: "70%",
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
    paddingTop: 20,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    opacity: 0.6,
  },
  buttonContainer: {
    width: "100%",
    marginTop: "40%",
  },
});
