import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import DailyInsights from "./components/DailyInsights";
import WeeklyCalendar from "./components/WeeklyCalendar";
import PeriodCountdown from "./components/PeriodCountdown";
import { ThemedText } from "@/components/ThemedText";
import { HomeIndexBackground } from "@/components/backgrounds/HomeIndexBackground";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { LoggingSheet } from "@/components/LoggingSheet";

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleAddInfoPress = useCallback(() => {
    if (bottomSheetRef.current) {
      try {
        bottomSheetRef.current.snapToIndex(1);
      } catch (error) {
        console.log("Error snapping to index:", error);
      }
    }
  }, []);

  const handleSheetClose = useCallback(() => {
    if (bottomSheetRef.current) {
      try {
        bottomSheetRef.current.close();
      } catch (error) {
        console.log("Error closing sheet:", error);
      }
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <HomeIndexBackground />
        <View style={styles.content}>
          <ThemedText type="title" style={styles.greeting}>
            Good Morning, Ella!
          </ThemedText>
          <WeeklyCalendar />
          <PeriodCountdown />
          <DailyInsights onAddInfoPress={handleAddInfoPress} />
        </View>
        <LoggingSheet
          bottomSheetRef={bottomSheetRef}
          onClose={handleSheetClose}
        />
      </ThemedView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: "25%",
  },
  greeting: {
    fontSize: 24,
    marginBottom: 24,
  },
});
