import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function StartScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.flowersContainer}>
          <Ionicons
            name="flower"
            size={50}
            color="#808080"
            style={{ opacity: 0.8 }}
          />
          <Ionicons
            name="flower"
            size={40}
            color="#808080"
            style={{ opacity: 0.6 }}
          />
          <Ionicons
            name="flower"
            size={30}
            color="#808080"
            style={{ opacity: 0.4 }}
          />
          <Ionicons
            name="flower"
            size={25}
            color="#808080"
            style={{ opacity: 0.3 }}
          />
          <Ionicons
            name="flower"
            size={20}
            color="#808080"
            style={{ opacity: 0.2 }}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>twenty eight</Text>
          <Text style={styles.subtitle}>get a track of your cycle</Text>
        </View>

        <DefaultButton
          onPress={() => router.push("/(tabs)")}
          style={styles.button}
          defaultColor={theme.yellow}
          defaultTextColor={theme.white}
        >
          Start Now
        </DefaultButton>
      </SafeAreaView>
    </SafeAreaProvider>
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
    flexDirection: "row",
    justifyContent: "space-around",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
});
