import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="cycleInsights" />
      <Stack.Screen name="ovulationDetails" />
      <Stack.Screen name="symptomDetails" />
    </Stack>
  );
}
