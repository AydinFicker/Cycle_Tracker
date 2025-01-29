import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

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

  // variables
  const snapPoints = useMemo(() => ["95%"], []);

  // callbacks
  const handleSheetChange = useCallback(
    (index: number) => {
      //   console.log("handleSheetChange", index);
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

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

          {/* Ovulation Section */}
          <View style={styles.category}>
            <View style={styles.categoryTitleRow}>
              <ThemedText type="subtitle">Ovulation test</ThemedText>
              <View style={styles.tutorialButton}>
                <ThemedText style={{ color: theme.tint }}>Tutorial</ThemedText>
                <Ionicons name="play-circle" size={16} color={theme.tint} />
              </View>
            </View>
            <ThemedText style={styles.categoryDescription}>
              Log them to know when you ovulate
            </ThemedText>
            <View style={styles.optionsContainer}>
              <View
                style={[styles.option, { backgroundColor: theme.tint + "20" }]}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color={theme.tint}
                />
                <ThemedText style={styles.optionText}>
                  Log ovulation test
                </ThemedText>
                <Ionicons name="add" size={24} color={theme.tint} />
              </View>
              <View
                style={[styles.option, { backgroundColor: theme.tint + "20" }]}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={24}
                  color={theme.tint}
                />
                <ThemedText style={styles.optionText}>
                  Didn't take tests
                </ThemedText>
              </View>
              <View
                style={[styles.option, { backgroundColor: theme.tint + "20" }]}
              >
                <Ionicons name="options-outline" size={24} color={theme.tint} />
                <ThemedText style={styles.optionText}>
                  Ovulation: My method
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Sex and Sex Drive Section */}
          <View style={styles.category}>
            <ThemedText type="subtitle">Sex and sex drive</ThemedText>
            <View style={styles.optionsGrid}>
              {/* Add your sex-related options here similar to the image */}
            </View>
          </View>
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
  category: {
    marginBottom: 24,
  },
  categoryTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  tutorialButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  categoryDescription: {
    opacity: 0.7,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
  },
});
