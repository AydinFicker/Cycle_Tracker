import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.yellow,
        tabBarInactiveTintColor: theme.icon,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            height: 80,
          },
          default: {
            height: 80,
          },
        }),
        tabBarLabel: () => null,
      }}
      initialRouteName="Home"
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabItemWrapper}>
              <View
                style={[
                  styles.tabItemContainer,
                  focused && [
                    styles.activeTabContainer,
                    { backgroundColor: theme.yellow + "20" },
                  ],
                ]}
              >
                <IconSymbol
                  size={focused ? 32 : 28}
                  name="house.fill"
                  color={color}
                />
                <ThemedText
                  style={[
                    styles.label,
                    {
                      color,
                      transform: [{ scale: focused ? 1.1 : 1 }],
                    },
                  ]}
                >
                  Home
                </ThemedText>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabItemWrapper}>
              <View
                style={[
                  styles.tabItemContainer,
                  focused && [
                    styles.activeTabContainer,
                    { backgroundColor: theme.yellow + "20" },
                  ],
                ]}
              >
                <IconSymbol
                  size={focused ? 32 : 28}
                  name="calendar"
                  color={color}
                />
                <ThemedText
                  style={[
                    styles.label,
                    {
                      color,
                      transform: [{ scale: focused ? 1.1 : 1 }],
                    },
                  ]}
                >
                  Calendar
                </ThemedText>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabItemWrapper}>
              <View
                style={[
                  styles.tabItemContainer,
                  focused && [
                    styles.activeTabContainer,
                    { backgroundColor: theme.yellow + "20" },
                  ],
                ]}
              >
                <IconSymbol
                  size={focused ? 32 : 28}
                  name="person.fill"
                  color={color}
                />
                <ThemedText
                  style={[
                    styles.label,
                    {
                      color,
                      transform: [{ scale: focused ? 1.1 : 1 }],
                    },
                  ]}
                >
                  Profile
                </ThemedText>
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItemWrapper: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    minWidth: 110,
    paddingVertical: 20,
  },
  activeTabContainer: {
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: -2,
    textAlign: "center",
  },
});
