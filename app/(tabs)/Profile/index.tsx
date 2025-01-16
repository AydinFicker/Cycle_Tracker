import { StyleSheet, View, useColorScheme } from "react-native";
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
        <Header title="Profile" />

        <View style={styles.content}>
          <View style={styles.menuContainer}>
            <FullButton
              icon={
                <Ionicons
                  name="information-circle"
                  size={24}
                  color={theme.text}
                />
              }
              onPress={() => router.push("/(tabs)")}
              defaultColor={theme.buttonBackground}
              defaultTextColor={theme.text}
              rightIcon={
                <Ionicons name="chevron-forward" size={24} color={theme.text} />
              }
            >
              Account Information
            </FullButton>

            <FullButton
              icon={<Ionicons name="settings" size={24} color={theme.text} />}
              onPress={() => router.push("/(tabs)")}
              defaultColor={theme.buttonBackground}
              defaultTextColor={theme.text}
              rightIcon={
                <Ionicons name="chevron-forward" size={24} color={theme.text} />
              }
            >
              App Settings
            </FullButton>

            <FullButton
              icon={<Ionicons name="person" size={24} color={theme.text} />}
              onPress={() => router.push("/(tabs)")}
              defaultColor={theme.buttonBackground}
              defaultTextColor={theme.text}
              rightIcon={
                <Ionicons name="chevron-forward" size={24} color={theme.text} />
              }
            >
              Privacy Settings
            </FullButton>

            <FullButton
              icon={
                <Ionicons name="notifications" size={24} color={theme.text} />
              }
              onPress={() => router.push("/(tabs)")}
              defaultColor={theme.buttonBackground}
              defaultTextColor={theme.text}
              rightIcon={
                <Ionicons name="chevron-forward" size={24} color={theme.text} />
              }
            >
              Reminders
            </FullButton>

            <FullButton
              icon={<Ionicons name="sync" size={24} color={theme.text} />}
              onPress={() => router.push("/(tabs)")}
              defaultColor={theme.buttonBackground}
              defaultTextColor={theme.text}
              rightIcon={
                <Ionicons name="chevron-forward" size={24} color={theme.text} />
              }
            >
              Update Situation Details
            </FullButton>
          </View>
        </View>

        <FullButton
          icon={<Ionicons name="log-out" size={24} color={theme.white} />}
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
    paddingTop: 20,
  },
  menuContainer: {
    gap: 6,
    // paddingHorizontal: 20,
  },
  logoutButton: {
    marginBottom: "20%",
    // marginHorizontal: 20,
  },
});
