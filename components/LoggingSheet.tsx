import React, { useCallback, useMemo, useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";
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

interface LoggingSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onClose: () => void;
}

export const LoggingSheet: React.FC<LoggingSheetProps> = ({
  bottomSheetRef,
  onClose,
}) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string[];
  }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

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
      setSelectedOptions((prev) => {
        const currentSelected = prev[categoryId] || [];
        const isAlreadySelected = currentSelected.includes(optionId);

        if (isAlreadySelected) {
          // Remove the option if it's already selected
          const newSelected = currentSelected.filter((id) => id !== optionId);
          const newState = { ...prev };
          if (newSelected.length === 0) {
            delete newState[categoryId];
          } else {
            newState[categoryId] = newSelected;
          }
          return newState;
        } else {
          // Add the option if it's not selected
          return {
            ...prev,
            [categoryId]: [...currentSelected, optionId],
          };
        }
      });
    },
    []
  );

  const handleApply = useCallback(
    (categoryId: string) => {
      // Handle applying the selected options
      console.log(
        "Applying options for category:",
        categoryId,
        selectedOptions[categoryId]
      );
      // Clear selections for this category after applying
      setSelectedOptions((prev) => ({
        ...prev,
        [categoryId]: [],
      }));
    },
    [selectedOptions]
  );

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
    if (!searchQuery) return LOGGING_CATEGORIES;

    return LOGGING_CATEGORIES.map((category) => ({
      ...category,
      options: category.options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    })).filter((category) => category.options.length > 0);
  }, [searchQuery]);

  const hasSelections = Object.keys(selectedOptions).length > 0;

  return (
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
            <ThemedText type="title">Today</ThemedText>
            <ThemedText style={styles.cycleDay}>Cycle day 23</ThemedText>
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
                selectedOptions={selectedOptions[category.id] || []}
                onOptionPress={(optionId) =>
                  handleOptionPress(category.id, optionId)
                }
              />
            ))}
          </View>
        </BottomSheetScrollView>

        <AnimatedApplyButton
          isVisible={hasSelections}
          onPress={() => {
            console.log("Applying all selections:", selectedOptions);
            setSelectedOptions({});
          }}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {},
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  headerTop: {
    alignItems: "center",
    marginBottom: 16,
  },
  cycleDay: {
    fontSize: 16,
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
});
