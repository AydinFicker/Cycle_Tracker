import { StyleSheet, useColorScheme, View, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CalendarList } from "react-native-calendars";

export default function CalendarScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const screenWidth = Dimensions.get("window").width;

  const markedDates = {
    "2025-02-04": {
      customStyles: { container: { backgroundColor: theme.yellow + "40" } },
    },
    "2025-02-09": {
      startingDay: true,
      color: theme.red + "40",
      textColor: theme.text,
    },
    "2025-02-10": { color: theme.red + "40", textColor: theme.text },
    "2025-02-11": { color: theme.red + "40", textColor: theme.text },
    "2025-02-12": { color: theme.red + "40", textColor: theme.text },
    "2025-02-13": {
      endingDay: true,
      color: theme.red + "40",
      textColor: theme.text,
    },
    "2025-02-24": {
      startingDay: true,
      color: theme.blue + "40",
      textColor: theme.text,
    },
    "2025-02-25": { color: theme.blue + "40", textColor: theme.text },
    "2025-02-26": { color: theme.blue + "40", textColor: theme.text },
    "2025-02-27": { color: theme.blue + "40", textColor: theme.text },
    "2025-02-28": {
      endingDay: true,
      color: theme.blue + "40",
      textColor: theme.text,
    },
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Calendar
        </ThemedText>

        <CalendarList
          // Disable horizontal scrolling
          horizontal={false}
          // Ensure one month fills the width
          calendarWidth={screenWidth - 40}
          // Past and future scroll range
          pastScrollRange={12}
          futureScrollRange={12}
          // Marking type for periods
          markingType={"period"}
          // Custom marking style
          markedDates={markedDates}
          // Theme customization
          theme={{
            backgroundColor: theme.background,
            calendarBackground: theme.background,
            textSectionTitleColor: theme.text,
            selectedDayBackgroundColor: theme.yellow,
            selectedDayTextColor: theme.text,
            todayTextColor: theme.yellow,
            dayTextColor: theme.text,
            textDisabledColor: theme.darkgrey,
            dotColor: theme.yellow,
            selectedDotColor: theme.text,
            arrowColor: theme.text,
            monthTextColor: theme.text,
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
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
