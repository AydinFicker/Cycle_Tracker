import {
  StyleSheet,
  View,
  useColorScheme,
  Dimensions,
  Alert,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { CalendarList, DateData } from "react-native-calendars";
import { Header } from "@/components/Header";
import { CircleLegend } from "@/components/CircleLegends";
import { ThickIconDefaultButton } from "@/components/buttons/ThickIconDefaultButton";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { CalendarIndexBackground } from "@/components/backgrounds/CalendarIndexBackground";
import { CYCLE_DATA } from "@/constants/CycleData";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { LoggingSheet } from "@/components/LoggingSheet";

type MarkedDates = {
  [date: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    color: string;
    textColor?: string;
  };
};

type ThemeColor = keyof (typeof Colors)["light"];

// Component for the Calendar content
const CalendarContent = ({
  theme,
  screenWidth,
  markedDates,
  onDayPress,
  onAddInfoPress,
}: {
  theme: any;
  screenWidth: number;
  markedDates: MarkedDates;
  onDayPress: (day: DateData) => void;
  onAddInfoPress: () => void;
}) => (
  <View style={styles.content}>
    <CalendarList
      horizontal={false}
      calendarWidth={screenWidth - 40}
      pastScrollRange={12}
      futureScrollRange={12}
      markingType={"period"}
      markedDates={markedDates}
      onDayPress={onDayPress}
      theme={{
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        textSectionTitleColor: theme.text,
        dayTextColor: theme.text,
        monthTextColor: theme.text,
        textDisabledColor: theme.darkgrey,
        selectedDayBackgroundColor: "transparent",
        selectedDayTextColor: theme.text,
        todayTextColor: theme.yellow40,
        todayBackgroundColor: "transparent",
        arrowColor: theme.text,
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14,
        textSectionTitleDisabledColor: theme.darkgrey,
        textDayStyle: { color: theme.text },
        textMonthFontWeight: "bold",
        textDayFontWeight: "400",
        textDayHeaderFontWeight: "400",
      }}
      style={styles.calendar}
    />

    <View style={styles.legendContainer}>
      <CircleLegend color={theme.yellow40}>Today</CircleLegend>
      <CircleLegend color={theme.red40}>Period</CircleLegend>
      <CircleLegend color={theme.blue40}>Ovulation</CircleLegend>
    </View>

    <View style={styles.buttonContainer}>
      <ThickIconDefaultButton
        onPress={onAddInfoPress}
        icon={<Ionicons name="pencil" size={24} color={theme.white} />}
        defaultColor={theme.yellow}
        defaultTextColor={theme.white}
        style={styles.leftButton}
      >
        Log Today's{"\n"}Symptoms
      </ThickIconDefaultButton>

      <ThickIconDefaultButton
        onPress={() => {
          // Set a subtitle explaining how to view previous logs
          Alert.alert(
            "View Previous Logs",
            "Simply tap on any date in the calendar above to view its log."
          );
        }}
        icon={<Ionicons name="search" size={24} color={theme.white} />}
        defaultColor={theme.blue}
        defaultTextColor={theme.white}
        style={styles.rightButton}
      >
        Look Up a{"\n"}Previous Log
      </ThickIconDefaultButton>
    </View>
  </View>
);

export default function CalendarScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const screenWidth = Dimensions.get("window").width;
  const { currentCycle } = CYCLE_DATA;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // Create marked dates with theme colors
  const markedDates = Object.entries(
    currentCycle.markedDates
  ).reduce<MarkedDates>(
    (acc, [date, marking]) => ({
      ...acc,
      [date]: {
        ...marking,
        color: theme[marking.color as ThemeColor] || theme.red40,
        ...(date === today && {
          color: theme.yellow40,
          textColor: theme.white,
        }),
      },
    }),
    {}
  );

  // Add standalone today if it's not in any period
  if (!(today in markedDates)) {
    markedDates[today] = {
      color: theme.yellow40,
      textColor: theme.white,
      startingDay: true,
      endingDay: true,
    };
  }

  const handleDayPress = useCallback(
    (day: DateData) => {
      console.log("selected day", day);
      const date = new Date(day.dateString);

      if (date > new Date()) {
        Alert.alert(
          "Cannot select future dates",
          "Please select today or a past date."
        );
        return;
      }

      setSelectedDate(date);

      if (bottomSheetRef.current) {
        try {
          // Hide tab bar immediately with aggressive positioning
          navigation.getParent()?.setOptions({
            tabBarStyle: {
              position: "absolute",
              bottom: -1000,
              left: 0,
              right: 0,
              zIndex: -1,
              opacity: 0,
              height: 0,
            },
          });
          setIsSheetOpen(true);
          bottomSheetRef.current.snapToIndex(0);
        } catch (error) {
          console.log("Error snapping to index:", error);
          navigation.getParent()?.setOptions({
            tabBarStyle: undefined,
          });
        }
      }
    },
    [navigation]
  );

  const handleAddInfoPress = useCallback(() => {
    // Set selected date to today
    const today = new Date();
    setSelectedDate(today);

    if (bottomSheetRef.current) {
      try {
        // Hide tab bar immediately with aggressive positioning
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            position: "absolute",
            bottom: -1000,
            left: 0,
            right: 0,
            zIndex: -1,
            opacity: 0,
            height: 0,
          },
        });
        setIsSheetOpen(true);
        bottomSheetRef.current.snapToIndex(1);
      } catch (error) {
        console.log("Error snapping to index:", error);
        navigation.getParent()?.setOptions({
          tabBarStyle: undefined,
        });
      }
    }
  }, [navigation]);

  // Handler for closing the sheet
  const handleSheetClose = useCallback(() => {
    if (bottomSheetRef.current) {
      try {
        setIsSheetOpen(false);
        bottomSheetRef.current.close();
      } catch (error) {
        console.log("Error closing sheet:", error);
      }
    }
  }, []);

  // Handler for sheet state changes
  const handleSheetChange = useCallback((index: number) => {
    setIsSheetOpen(index !== -1);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <CalendarIndexBackground />
        <Header title="Calendar" showBackButton={false} />

        {!isSheetOpen && (
          <CalendarContent
            theme={theme}
            screenWidth={screenWidth}
            markedDates={markedDates}
            onDayPress={handleDayPress}
            onAddInfoPress={handleAddInfoPress}
          />
        )}

        <LoggingSheet
          bottomSheetRef={bottomSheetRef}
          onClose={handleSheetClose}
          initialDate={selectedDate || undefined}
          onChange={handleSheetChange}
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
    paddingHorizontal: 20,
  },
  calendar: {
    height: 350,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
    marginTop: "10%",
  },
  leftButton: {
    flex: 1,
  },
  rightButton: {
    flex: 1,
  },
});
