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
          },
          default: {},
        }),
        tabBarLabel: ({ focused, children, color }) => (
          <ThemedText
            style={[
              styles.label,
              {
                color,
                transform: [{ scale: focused ? 1.1 : 1 }],
              },
            ]}
          >
            {children}
          </ThemedText>
        ),
        tabBarIconStyle: {
          marginTop: 5,
        },
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
            <View
              style={
                focused
                  ? [
                      styles.activeIconContainer,
                      { backgroundColor: theme.yellow + "20" },
                    ]
                  : null
              }
            >
              <IconSymbol
                size={focused ? 32 : 28}
                name="house.fill"
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                focused
                  ? [
                      styles.activeIconContainer,
                      { backgroundColor: theme.yellow + "20" },
                    ]
                  : null
              }
            >
              <IconSymbol
                size={focused ? 32 : 28}
                name="calendar"
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                focused
                  ? [
                      styles.activeIconContainer,
                      { backgroundColor: theme.yellow + "20" },
                    ]
                  : null
              }
            >
              <IconSymbol
                size={focused ? 32 : 28}
                name="person.fill"
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 5,
  },
  activeIconContainer: {
    padding: 8,
    borderRadius: 50,
    paddingHorizontal: 45,
    // paddingVertical: 10,
  },
});
