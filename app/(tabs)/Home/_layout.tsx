import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="cycleInsights" options={{ headerShown: false }} />
      <Stack.Screen name="ovulationDetails" options={{ headerShown: false }} />
      <Stack.Screen name="symptomDetails" options={{ headerShown: false }} />
    </Stack>
  );
}
