import { ScrollView, StyleSheet, View, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FullButton } from "@/components/buttons/FullButton";
import { BigButton } from "@/components/buttons/BigButton";
import { SmallButton } from "@/components/buttons/SmallButton";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Header } from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ProfilePersonal } from "@/components/ProfilePersonal";

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
        <Header title="Profile" style={styles.header} />

        <View style={styles.content}>
          <ProfilePersonal onPress={() => router.push("/(tabs)")}>
            <ThemedText type="title">Ella Jones</ThemedText>
          </ProfilePersonal>

          <View style={styles.premiumSection}>
            <BigButton
              onPress={() => {}}
              defaultColor={theme.yellow}
              defaultTextColor={theme.white}
              style={styles.upgradeButton}
            >
              Upgrade to Premium
            </BigButton>
          </View>

          <View style={styles.goalSection}>
            <ThemedText type="defaultSemiBold" style={styles.goalText}>
              My Goal:
            </ThemedText>
            <View style={styles.goalButtons}>
              <SmallButton
                onPress={() => {}}
                defaultColor={theme.red}
                defaultTextColor={theme.white}
              >
                Track Cycle
              </SmallButton>
              <SmallButton
                onPress={() => {}}
                defaultColor={theme.buttonBackground}
                defaultTextColor={theme.text}
              >
                Get Pregnant
              </SmallButton>
            </View>
          </View>

          <ScrollView style={styles.menuScroll}>
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
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={theme.text}
                  />
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
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={theme.text}
                  />
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
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={theme.text}
                  />
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
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={theme.text}
                  />
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
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={theme.text}
                  />
                }
              >
                Update Situation Details
              </FullButton>

              <View style={styles.logoutSection}>
                <FullButton
                  icon={
                    <Ionicons name="log-out" size={24} color={theme.white} />
                  }
                  onPress={handleLogout}
                  defaultColor={theme.red}
                  defaultTextColor={theme.white}
                >
                  Log Out
                </FullButton>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 50, // Height of header
  },
  premiumSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  upgradeButton: {
    width: "100%",
  },
  goalSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  goalText: {
    marginBottom: 12,
  },
  goalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  menuScroll: {
    flex: 1,
  },
  menuContainer: {
    gap: 6,
  },
  logoutSection: {
    marginTop: 40,
    marginBottom: 60,
  },
});
