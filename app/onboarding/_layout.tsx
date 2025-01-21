import { Stack } from "expo-router";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function OnboardingLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            title: "Index",
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            title: "Sign Up Selection",
          }}
        />
        <Stack.Screen
          name="cycle-info"
          options={{
            title: "Cycle Information Onboarding",
          }}
        />
        <Stack.Screen
          name="symptoms-info"
          options={{
            title: "Cycle Information Onboarding",
          }}
        />
        <Stack.Screen
          name="health-info"
          options={{
            title: "Health Information Onboarding",
          }}
        />
        <Stack.Screen
          name="period-dates"
          options={{
            title: "Period Dates Selection",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
