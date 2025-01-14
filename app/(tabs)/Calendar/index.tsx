import { StyleSheet, useColorScheme, View, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CalendarList, DateData } from "react-native-calendars";

export default function CalendarScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const screenWidth = Dimensions.get("window").width;

  const markedDates = {
    // Period dates (red)
    "2025-02-09": {
      startingDay: true,
      color: theme.red,
    },
    "2025-02-10": {
      color: theme.red,
    },
    "2025-02-11": {
      color: theme.red,
    },
    "2025-02-12": {
      color: theme.red,
    },
    "2025-02-13": {
      endingDay: true,
      color: theme.red,
    },
    // Ovulation dates (blue)
    "2025-02-24": {
      startingDay: true,
      color: theme.blue,
    },
    "2025-02-25": {
      color: theme.blue,
    },
    "2025-02-26": {
      color: theme.blue,
    },
    "2025-02-27": {
      color: theme.blue,
    },
    "2025-02-28": {
      endingDay: true,
      color: theme.blue,
    },
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
            todayTextColor: theme.yellow,
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
