import { StyleSheet, View, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CalendarList, DateData } from "react-native-calendars";
import { useState } from "react";
import { LoadingTopBar } from "@/components/onboarding/LoadingTopBar";
import { SkipButton } from "@/components/onboarding/skip";
import { NextButton } from "@/components/onboarding/next";
import { BackButton } from "@/components/onboarding/back";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import { router } from "expo-router";

export default function PeriodDatesScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [selectedDates, setSelectedDates] = useState<{
    start?: string;
    end?: string;
  }>({});

  const handleDayPress = (day: DateData) => {
    if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
      // Start new selection
      setSelectedDates({ start: day.dateString });
    } else {
      // Complete the selection
      if (day.dateString < selectedDates.start) {
        setSelectedDates({
          start: day.dateString,
          end: selectedDates.start,
        });
      } else {
        setSelectedDates({
          start: selectedDates.start,
          end: day.dateString,
        });
      }
    }
  };

  const getMarkedDates = () => {
    if (!selectedDates.start) return {};

    const markedDates: any = {
      [selectedDates.start]: {
        startingDay: true,
        color: theme.red,
        textColor: theme.white,
      },
    };

    if (selectedDates.end) {
      markedDates[selectedDates.end] = {
        endingDay: true,
        color: theme.red,
        textColor: theme.white,
      };

      // Fill in the middle dates
      let currentDate = new Date(selectedDates.start);
      const endDate = new Date(selectedDates.end);
      currentDate.setDate(currentDate.getDate() + 1);

      while (currentDate < endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        markedDates[dateString] = {
          color: theme.red,
          textColor: theme.white,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return markedDates;
  };

  return (
    <ThemedView style={styles.container}>
      <LoadingTopBar progress={100} style={styles.progressBar} />
      <SkipButton href="/(tabs)" />

      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Note down your last period
        </ThemedText>

        <CalendarList
          horizontal={false}
          pagingEnabled
          scrollEnabled
          pastScrollRange={12}
          futureScrollRange={0}
          showScrollIndicator={false}
          onDayPress={handleDayPress}
          markingType="period"
          markedDates={getMarkedDates()}
          theme={{
            calendarBackground: "transparent",
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
            selectedDayTextColor: theme.text,
            todayTextColor: theme.yellow,
            dayTextColor: theme.text,
            textDisabledColor: theme.darkgrey,
            monthTextColor: theme.text,
          }}
          style={styles.calendar}
        />

        {selectedDates.start && selectedDates.end && (
          <DefaultButton
            onPress={() => {
              router.push("/(tabs)");
            }}
            defaultColor={theme.yellow}
            defaultTextColor={theme.white}
            style={styles.confirmButton}
          >
            Confirm Dates
          </DefaultButton>
        )}

        <NextButton href="/(tabs)" />
        <BackButton />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    margin: 20,
    marginTop: 40,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  calendar: {
    height: 350,
  },
  confirmButton: {
    marginVertical: 20,
    width: "95%",
    alignSelf: "center",
  },
});
