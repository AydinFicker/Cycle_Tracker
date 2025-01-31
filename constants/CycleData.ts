import { addDays, format } from "date-fns";

// Helper function to get formatted date string
const getDateString = (daysFromNow: number) => {
  return format(addDays(new Date(), daysFromNow), "yyyy-MM-dd");
};

export const CYCLE_DATA = {
  currentCycle: {
    cycleDay: 23,
    cycleLength: 28,
    periodLength: 7,
    ovulationLength: 6,
    // Period starts in 4 days
    nextPeriodStart: getDateString(4),
    // Ovulation starts 13 days after period
    nextOvulationStart: getDateString(17), // 4 + 13
    currentPhase: "Ovulation Phase",
    // Calculate dates for calendar marking
    markedDates: {
      // Period dates (next period)
      [getDateString(4)]: { startingDay: true, color: "red40" },
      [getDateString(5)]: { color: "red40" },
      [getDateString(6)]: { color: "red40" },
      [getDateString(7)]: { color: "red40" },
      [getDateString(8)]: { color: "red40" },
      [getDateString(9)]: { color: "red40" },
      [getDateString(10)]: { endingDay: true, color: "red40" },
      // Ovulation dates
      [getDateString(17)]: { startingDay: true, color: "blue40" },
      [getDateString(18)]: { color: "blue40" },
      [getDateString(19)]: { color: "blue40" },
      [getDateString(20)]: { color: "blue40" },
      [getDateString(21)]: { color: "blue40" },
      [getDateString(22)]: { endingDay: true, color: "blue40" },
    },
  },
  historicalCycles: [
    // We can add historical cycle data here when needed
  ],
};
