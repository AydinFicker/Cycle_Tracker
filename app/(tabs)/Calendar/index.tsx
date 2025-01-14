import { StyleSheet, useColorScheme, View, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CalendarList, DateData } from "react-native-calendars";

export default function CalendarScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const screenWidth = Dimensions.get("window").width;

  const today = new Date().toISOString().split("T")[0];

  // Create base marked dates without today
  const baseMarkedDates = {
    // Period dates (red)
    "2025-01-15": {
      startingDay: true,
      color: theme.red40,
      ...(today === "2025-01-15" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-01-16": {
      color: theme.red40,
      ...(today === "2025-01-16" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-01-17": {
      color: theme.red40,
      ...(today === "2025-01-17" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-01-18": {
      color: theme.red40,
      ...(today === "2025-01-18" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-01-19": {
      color: theme.red40,
      ...(today === "2025-01-19" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-01-20": {
      color: theme.red40,
      ...(today === "2025-01-20" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-01-21": {
      endingDay: true,
      color: theme.red40,
      ...(today === "2025-01-21" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    // Ovulation dates (blue)
    "2025-01-29": {
      startingDay: true,
      color: theme.blue40,
      ...(today === "2025-01-29" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-01-30": {
      color: theme.blue40,
      ...(today === "2025-01-30" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-01-31": {
      color: theme.blue40,
      ...(today === "2025-01-31" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-02-01": {
      color: theme.blue40,
      ...(today === "2025-02-01" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-02-02": {
      color: theme.blue40,
      ...(today === "2025-02-02" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
    "2025-02-03": {
      endingDay: true,
      color: theme.blue40,
      ...(today === "2025-02-03" && {
        color: theme.yellow40,
        textColor: theme.white,
      }),
    },
  };

  // Add standalone today if it's not in any period
  const markedDates = {
    ...baseMarkedDates,
    ...(!(today in baseMarkedDates) && {
      [today]: {
        color: theme.yellow40,
        textColor: theme.white,
        startingDay: true,
        endingDay: true,
      },
    }),
  };

  const handleDayPress = (day: DateData) => {
    console.log("selected day", day);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Calendar
        </ThemedText>

        <CalendarList
          horizontal={false}
          calendarWidth={screenWidth - 40}
          pastScrollRange={12}
          futureScrollRange={12}
          markingType={"period"}
          markedDates={markedDates}
          onDayPress={handleDayPress}
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
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  title: {
    marginBottom: 30,
    textAlign: "center",
  },
  calendar: {
    height: 350,
  },
});
