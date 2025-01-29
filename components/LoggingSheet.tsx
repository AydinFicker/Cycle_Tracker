import React, { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LOGGING_CATEGORIES } from "@/constants/LoggingOptions";
import { LoggingCategory } from "./logging/LoggingCategory";
import { LoggingData } from "@/types/logging";

interface LoggingSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  onClose: () => void;
}

export const LoggingSheet: React.FC<LoggingSheetProps> = ({
  bottomSheetRef,
  onClose,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // variables
  const snapPoints = useMemo(() => ["95%"], []);

  // callbacks
  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const handleOptionPress = useCallback((id: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((optionId) => optionId !== id);
      }
      return [...prev, id];
    });
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return LOGGING_CATEGORIES;

    return LOGGING_CATEGORIES.map((category) => ({
      ...category,
      options: category.options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    })).filter((category) => category.options.length > 0);
  }, [searchQuery]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: theme.background }}
      handleIndicatorStyle={{ backgroundColor: theme.text }}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <ThemedText type="title">Today</ThemedText>
            <ThemedText style={styles.cycleDay}>Cycle day 23</ThemedText>
          </View>
          <View style={styles.searchContainer}>
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
            <Ionicons name="shield-checkmark" size={20} color={theme.tint} />
            <ThemedText style={styles.protectionText}>
              Your data is protected
            </ThemedText>
          </View>
        </View>

        {/* Categories */}
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
              selectedOptions={selectedOptions}
              onOptionPress={handleOptionPress}
            />
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
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
    marginBottom: 20,
  },
  protectionText: {
    marginLeft: 8,
    fontSize: 14,
    opacity: 0.7,
  },
  categoriesContainer: {
    padding: 20,
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
