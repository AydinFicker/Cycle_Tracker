import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
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
import { DefaultButton } from "./buttons/DefaultButton";

interface LoggingSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onClose: () => void;
}

interface SelectedOptions {
  [key: string]: {
    selected: string[];
    details?: {
      testTypeId?: string;
      resultId?: string;
      waterAmount?: number;
      [key: string]: any;
    };
  };
}

export const LoggingSheet: React.FC<LoggingSheetProps> = ({
  bottomSheetRef,
  onClose,
}) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();
  const [isOvulationTestModalVisible, setIsOvulationTestModalVisible] =
    useState(false);
  const [waterAmount, setWaterAmount] = useState(0);
  const [waterSettings, setWaterSettings] = useState({
    dailyGoal: 72,
    increment: 8,
  });

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

  const handleOptionPress = useCallback(
    (categoryId: string, optionId: string) => {
      // Find the selected option
      const category = LOGGING_CATEGORIES.find((cat) => cat.id === categoryId);
      const option = category?.options.find((opt) => opt.id === optionId);

      if (option?.modalConfig?.type === "ovulationTest") {
        setIsOvulationTestModalVisible(true);
      } else {
        // Handle normal selection
        setSelectedOptions((prev) => {
          const currentSelected = prev[categoryId]?.selected || [];
          const isAlreadySelected = currentSelected.includes(optionId);

          if (isAlreadySelected) {
            const newSelected = currentSelected.filter((id) => id !== optionId);
            const newState = { ...prev };
            if (newSelected.length === 0) {
              delete newState[categoryId];
            } else {
              newState[categoryId] = { selected: newSelected };
            }
            return newState;
          } else {
            return {
              ...prev,
              [categoryId]: {
                selected: [...currentSelected, optionId],
              },
            };
          }
        });
      }
    },
    []
  );

  const handleWaterChange = useCallback((amount: number) => {
    setWaterAmount(amount);
    setSelectedOptions((prev) => ({
      ...prev,
      water_tracking: {
        selected: ["log_water"],
        details: {
          waterAmount: amount,
        },
      },
    }));
  }, []);

  const handleWaterSettingsChange = useCallback(
    (settings: { dailyGoal: number; increment: number }) => {
      setWaterSettings(settings);
    },
    []
  );

  const handleModalSubmit = useCallback(
    (data: { testTypeId: string; resultId: string }) => {
      // Store the detailed data for future analysis
      console.log("Modal data submitted:", data);

      // Mark the "Log ovulation test" option as selected and store the detailed data
      setSelectedOptions((prev) => ({
        ...prev,
        ovulation_test: {
          selected: ["log_test"],
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

  const handleApply = useCallback(() => {
    // Prepare data for API call
    const apiData = Object.entries(selectedOptions).map(
      ([categoryId, data]) => ({
        categoryId,
        selected: data.selected,
        details: data.details,
        // timestamp: selectedDate,
      })
    );

    // Log the data that would be sent to the API
    console.log("Sending to API:", apiData);

    // Clear selections after successful API call
    setSelectedOptions({});
    onClose();
  }, [selectedOptions, selectedDate, onClose]);

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

  const hasSelections = Object.keys(selectedOptions).length > 0;

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
                    setSelectedOptions({});
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
                      setSelectedOptions({});
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
                <ThemedText style={styles.editButton}>Edit</ThemedText>
              </View>

              {filteredCategories.map((category) => (
                <LoggingCategory
                  key={category.id}
                  category={category}
                  selectedOptions={selectedOptions[category.id]?.selected || []}
                  onOptionPress={(optionId) =>
                    handleOptionPress(category.id, optionId)
                  }
                />
              ))}
              <WaterSection
                waterAmount={waterAmount}
                onIncrement={() =>
                  handleWaterChange(waterAmount + waterSettings.increment)
                }
                onDecrement={() =>
                  handleWaterChange(
                    Math.max(0, waterAmount - waterSettings.increment)
                  )
                }
                dailyGoal={waterSettings.dailyGoal}
                increment={waterSettings.increment}
                onSettingsChange={handleWaterSettingsChange}
              />
            </View>
          </BottomSheetScrollView>

          <AnimatedApplyButton
            isVisible={hasSelections}
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
  editButton: {
    color: "#FF69B4",
    fontSize: 16,
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
