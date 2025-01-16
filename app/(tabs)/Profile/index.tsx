import { StyleSheet, View, useColorScheme, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FullButton } from "@/components/buttons/FullButton";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Header } from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileIndexScreen() {
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
          <Header title="Profile" />
          {/* Rest of your profile screen content */}
        </View>

        <FullButton
          icon={<Ionicons name="pencil" size={24} color={theme.white} />}
          onPress={handleLogout}
          style={styles.logoutButton}
          defaultColor={theme.red}
          defaultTextColor={theme.white}
        >
          Log Out
        </FullButton>
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
