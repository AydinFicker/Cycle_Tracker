import { Stack } from "expo-router";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function OnboardingLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="cycle-info"
          options={{
            title: "Cycle Information",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
