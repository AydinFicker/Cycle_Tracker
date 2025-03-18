import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LOGGING_CATEGORIES } from "@/constants/LoggingOptions";
import { LoggingCategory } from "./logging/LoggingCategory";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { AnimatedApplyButton } from "./buttons/AnimatedApplyButton";
import { format, isToday, isYesterday, isFuture } from "date-fns";
import { CYCLE_DATA } from "@/constants/CycleData";
import { OvulationTestModal } from "@/components/modals/OvulationTestModal";
import { WaterSection } from "./logging/WaterSection";
import { WeightSection } from "./logging/WeightSection";
import { DefaultButton } from "./buttons/DefaultButton";
import { LoggingData } from "@/types/logging";
import { PillSection, Pill } from "./logging/PillSection";

interface LoggingSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onClose: () => void;
  initialDate?: Date;
}

export const LoggingSheet: React.FC<LoggingSheetProps> = ({
  bottomSheetRef,
  onClose,
  initialDate,
}) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
  const [loggingData, setLoggingData] = useState<LoggingData>({});
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();
  const [isOvulationTestModalVisible, setIsOvulationTestModalVisible] =
    useState(false);
  const [pills, setPills] = useState<Pill[]>([]);

  // Add useEffect to update selectedDate when initialDate changes
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
      setLoggingData({}); // Clear data when date changes
    }
  }, [initialDate]);

  // Format the selected date for display
  const formattedDate = useMemo(() => {
    if (isToday(selectedDate)) return "Today";
    if (isYesterday(selectedDate)) return "Yesterday";
    return format(selectedDate, "d MMM yyyy");
  }, [selectedDate]);

  // Get cycle day for selected date
  const cycleDay = useMemo(() => {
    if (isToday(selectedDate)) return CYCLE_DATA.currentCycle.cycleDay;
    // TODO: Calculate cycle day for past dates when we have historical data
    return "20"; // Placeholder
  }, [selectedDate]);

  // variables
  const snapPoints = useMemo(() => ["90%"], []);

  // Show tab bar when sheet is dragged down 30%
  const handleSheetAnimate = useCallback(
    (_: number, toIndex: number) => {
      if (toIndex < 0.7) {
        navigation.getParent()?.setOptions({
          tabBarStyle: undefined,
        });
      }
    },
    [navigation]
  );

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        navigation.getParent()?.setOptions({
          tabBarStyle: undefined,
        });
        onClose();
      }
    },
    [onClose, navigation]
  );

  // Water tracking state management
  const handleWaterChange = (amount: number) => {
    setLoggingData((prev) => ({
      ...prev,
      water_tracking: {
        selected: true,
        timestamp: new Date(),
        details: { waterAmount: amount },
      },
    }));
  };

  // Weight tracking state management
  const handleWeightChange = (weight: number | null, unit: "lbs" | "kg") => {
    setLoggingData((prev) => ({
      ...prev,
      weight_tracking: {
        selected: true,
        timestamp: new Date(),
        details: { weight, unit },
      },
    }));
  };

  // Regular category option handling
  const handleOptionPress = (optionId: string) => {
    setLoggingData((prev) => {
      const currentOption = prev[optionId];
      if (currentOption?.selected) {
        const { [optionId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [optionId]: {
          selected: true,
          timestamp: new Date(),
        },
      };
    });
  };

  const handleModalSubmit = useCallback(
    (data: { testTypeId: string; resultId: string }) => {
      // Store the detailed data for future analysis
      console.log("Modal data submitted:", data);

      // Mark the "Log ovulation test" option as selected and store the detailed data
      setLoggingData((prev) => ({
        ...prev,
        ovulation_test: {
          selected: true,
          timestamp: new Date(),
          details: {
            testTypeId: data.testTypeId,
            resultId: data.resultId,
          },
        },
      }));

      // Close the modal
      setIsOvulationTestModalVisible(false);
    },
    []
  );

  const handleApply = () => {
    // Deep clone the data to avoid [Array] in console
    const dataToLog = JSON.parse(JSON.stringify(loggingData));

    // Log the full data structure
    console.log("Full logging data:", JSON.stringify(dataToLog, null, 2));

    if (dataToLog.pill_tracking) {
      console.log("Taken pills:", dataToLog.pill_tracking.details.pills);
    }

    // TODO: Add actual API call here
    onClose();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const filteredCategories = useMemo(() => {
    if (!searchQuery) {
      // Filter out water tracking from categories since we're showing it separately
      return LOGGING_CATEGORIES.filter((cat) => cat.id !== "water_tracking");
    }

    return LOGGING_CATEGORIES.filter((cat) => cat.id !== "water_tracking")
      .map((category) => ({
        ...category,
        options: category.options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((category) => category.options.length > 0);
  }, [searchQuery]);

  const hasSelectedOptions = Object.keys(loggingData).length > 0;

  const handlePillAdd = (pillData: {
    name: string;
    intakes: number;
    reminderTimes: (string | null)[];
  }) => {
    // Create multiple pill instances with sequential intake numbers
    for (let i = 1; i <= pillData.intakes; i++) {
      const newPill: Omit<Pill, "id"> = {
        ...pillData,
        intakeNumber: i,
        taken: false,
      };
      setPills((prev) => [...prev, { ...newPill, id: `${Date.now()}-${i}` }]);
    }
  };

  const handlePillTake = (pillId: string) => {
    // Update the pills state
    setPills(
      pills.map((pill) =>
        pill.id === pillId ? { ...pill, taken: !pill.taken } : pill
      )
    );

    // Update loggingData when pills are taken/untaken
    setLoggingData((prev) => {
      const updatedPills = pills.map((pill) =>
        pill.id === pillId ? { ...pill, taken: !pill.taken } : pill
      );

      const takenPills = updatedPills.filter((pill) => pill.taken);

      if (takenPills.length > 0) {
        return {
          ...prev,
          pill_tracking: {
            selected: true,
            timestamp: new Date(),
            details: {
              pills: takenPills.map((pill) => ({
                id: pill.id,
                name: pill.name,
                intakes: pill.intakes,
                intakeNumber: pill.intakeNumber,
                reminderTimes: pill.reminderTimes,
                taken: true,
              })),
            },
          },
        };
      } else {
        // If no pills are taken, remove pill tracking from loggingData
        const { pill_tracking, ...rest } = prev;
        return rest;
      }
    });
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        onAnimate={handleSheetAnimate}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.modalBackground }}
        handleIndicatorStyle={{ backgroundColor: theme.text }}
        topInset={insets.top}
        style={styles.bottomSheet}
      >
        <View style={{ flex: 1 }}>
          {/* Sticky Header */}
          <View
            style={[styles.header, { backgroundColor: theme.modalBackground }]}
          >
            <View style={styles.headerTop}>
              <View style={styles.dateNavigator}>
                <TouchableOpacity
                  onPress={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() - 1);
                    setSelectedDate(newDate);
                    setLoggingData({});
                  }}
                  style={[styles.dateArrow, styles.leftArrow]}
                >
                  <Ionicons name="chevron-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <ThemedText type="subtitle">{formattedDate}</ThemedText>
                <TouchableOpacity
                  onPress={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() + 1);
                    if (!isFuture(newDate)) {
                      setSelectedDate(newDate);
                      setLoggingData({});
                    }
                  }}
                  style={[
                    styles.dateArrow,
                    styles.rightArrow,
                    isFuture(
                      new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
                    ) && styles.dateArrowDisabled,
                  ]}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={theme.text}
                  />
                </TouchableOpacity>
              </View>
              <ThemedText style={styles.cycleDay}>
                Cycle day {cycleDay}
              </ThemedText>
            </View>

            <View
              style={[
                styles.searchContainer,
                { backgroundColor: theme.background },
              ]}
            >
              <Ionicons
                name="search"
                size={20}
                color={theme.text}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor={theme.tabIconDefault}
                style={[styles.searchInput, { color: theme.text }]}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.dataProtection}>
              <Ionicons name="shield-checkmark" size={20} color={theme.blue} />
              <ThemedText style={styles.protectionText}>
                Your data is protected
              </ThemedText>
            </View>
          </View>

          {/* Scrollable Content */}
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.categoriesContainer}>
              <View style={styles.categoryHeader}>
                <ThemedText type="title" style={styles.categoryTitle}>
                  Categories
                </ThemedText>
              </View>

              {LOGGING_CATEGORIES.map((category) => {
                if (category.id === "tracking_essentials") {
                  // Render custom components for tracking essentials
                  return (
                    <View key={category.id}>
                      <PillSection
                        pills={pills}
                        onPillAdd={handlePillAdd}
                        onPillTake={handlePillTake}
                        onPillsUpdate={setPills}
                      />
                      <WaterSection
                        waterAmount={
                          loggingData.water_tracking?.details?.waterAmount ?? 0
                        }
                        onIncrement={() => {
                          const currentAmount =
                            loggingData.water_tracking?.details?.waterAmount ??
                            0;
                          handleWaterChange(currentAmount + 8);
                        }}
                        onDecrement={() => {
                          const currentAmount =
                            loggingData.water_tracking?.details?.waterAmount ??
                            0;
                          if (currentAmount > 0) {
                            handleWaterChange(currentAmount - 8);
                          }
                        }}
                        dailyGoal={72}
                        increment={8}
                        onSettingsChange={({ dailyGoal, increment }) => {
                          // Handle settings change
                        }}
                      />
                      <WeightSection
                        weight={
                          loggingData.weight_tracking?.details?.weight ?? null
                        }
                        unit={
                          loggingData.weight_tracking?.details?.unit ?? "kg"
                        }
                        onWeightChange={handleWeightChange}
                        defaultWeight={60}
                      />
                    </View>
                  );
                }

                // Render regular categories
                return (
                  <LoggingCategory
                    key={category.id}
                    category={category}
                    selectedOptions={Object.keys(loggingData)}
                    onOptionPress={handleOptionPress}
                  />
                );
              })}
            </View>
          </BottomSheetScrollView>

          <AnimatedApplyButton
            isVisible={hasSelectedOptions}
            onPress={handleApply}
            onClose={onClose}
          />
        </View>
      </BottomSheet>

      <OvulationTestModal
        isVisible={isOvulationTestModalVisible}
        onClose={() => setIsOvulationTestModalVisible(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {},
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  headerTop: {
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  cycleDay: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  dataProtection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  protectionText: {
    marginLeft: 8,
    fontSize: 14,
    opacity: 0.7,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  categoriesContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 24,
  },
  dateNavigator: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  dateArrow: {
    padding: 4,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  leftArrow: {
    left: 0,
  },
  rightArrow: {
    right: 0,
  },
  dateArrowDisabled: {
    opacity: 0.3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  submitButton: {
    marginTop: 20,
  },
});
