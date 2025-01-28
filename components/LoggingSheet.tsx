import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

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
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback(
    (index: number) => {
      console.log("handleSheetChange", index);
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: theme.background }}
      handleIndicatorStyle={{ backgroundColor: theme.text }}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <ThemedText type="title">Add Daily Log</ThemedText>
        </View>
        <View style={styles.content}>
          <ThemedText>Your Logging Sheet Content Here</ThemedText>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
