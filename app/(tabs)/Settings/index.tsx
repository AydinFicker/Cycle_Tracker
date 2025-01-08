import {
  StyleSheet,
  View,
  useColorScheme,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function HomeIndexScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const handleLogout = () => {
    router.push("/onboarding");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.content}>
          <Text style={{ color: theme.text }}> Settings </Text>
        </View>

        <DefaultButton
          onPress={handleLogout}
          style={styles.logoutButton}
          defaultColor={theme.red}
          defaultTextColor={theme.white}
        >
          Log Out
        </DefaultButton>
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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    alignItems: "center",
  },
  logoutButton: {
    marginBottom: "25%",
  },
});
