import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export const WeeklyCalendar = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  // Generate array of next 7 days starting from today
  const generateWeekDays = () => {
    const days = [];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      days.push({
        day: dayNames[date.getDay()],
        date: date.getDate().toString(),
        isToday: i === 0,
        // Example period/ovulation logic - replace with actual calculation
        isPeriod: i === 4,
        isOvulation: i === 5,
      });
    }

    return days;
  };

  const days = generateWeekDays();

  return (
    <View style={styles.container}>
      <View style={styles.calendarStrip}>
        {days.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayContainer,
              day.isToday && {
                backgroundColor: theme.yellow,
                borderRadius: 24,
              },
              day.isPeriod && {
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: theme.red,
                borderRadius: 24,
              },
              day.isOvulation && {
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: theme.blue,
                borderRadius: 24,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.dayText,
                day.isToday && { color: theme.white },
                day.isPeriod && { color: theme.red },
                day.isOvulation && { color: theme.blue },
              ]}
            >
              {day.day}
            </ThemedText>
            <ThemedText
              style={[
                styles.dateText,
                day.isToday && { color: theme.white },
                day.isPeriod && { color: theme.red },
                day.isOvulation && { color: theme.blue },
              ]}
            >
              {day.date}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 24,
  },
  calendarStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  dayContainer: {
    width: 40,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 14,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
