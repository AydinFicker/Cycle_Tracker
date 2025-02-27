import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { SmallTextButton } from "@/components/buttons/SmallTextButton";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pill } from "@/types/logging";

interface PillListModalProps {
  isVisible: boolean;
  onClose: () => void;
  pills: Pill[];
  onPillEdit: (pill: Pill) => void;
  onPillDelete: (pillName: string) => void;
  onPillsReorder: (pills: Pill[]) => void;
}

export const PillListModal: React.FC<PillListModalProps> = ({
  isVisible,
  onClose,
  pills = [],
  onPillEdit,
  onPillDelete,
  onPillsReorder,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  // Use a ref to track drag state and avoid state updates during drag
  const isDraggingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use a single source of truth for data
  const [data, setData] = useState<Pill[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Update data when pills change but NOT during drag operations
  useEffect(() => {
    if (
      isVisible &&
      !isDraggingRef.current &&
      !isUpdating &&
      Array.isArray(pills)
    ) {
      setData([...pills]);
    }
  }, [isVisible, pills, isUpdating]);

  // The key to fixing jumping: create stable callbacks with useCallback

  // Memoized drag end handler - critical for stability
  const handleDragEnd = useCallback(
    ({ data: newData }: { data: Pill[] }) => {
      // First update visual representation immediately
      setData(newData);

      // Mark as dragging during the update to prevent reloading data from props
      isDraggingRef.current = true;

      // Then show updating indicator and prevent further updates while processing
      setIsUpdating(true);

      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a timeout to update parent state after animations complete
      timeoutRef.current = setTimeout(() => {
        onPillsReorder(newData); // Update parent state after delay
        isDraggingRef.current = false; // Reset dragging ref
        setIsUpdating(false); // Reset updating state
        timeoutRef.current = null;
      }, 800); // Longer timeout to ensure animations complete
    },
    [onPillsReorder]
  );

  // Stable memoized item renderer with onDragStart logic built in
  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Pill>) => {
      if (!item) return null;

      // The onDragBegin handler that will be triggered from the press event
      const handleBeginDrag = () => {
        isDraggingRef.current = true; // Mark as dragging when drag starts
        drag(); // Call the drag function from DraggableFlatList
      };

      return (
        <ScaleDecorator>
          <View
            style={[
              styles.pillItem,
              {
                backgroundColor: isActive
                  ? theme.buttonBackground
                  : theme.background,
                borderColor: theme.buttonBackground,
              },
            ]}
          >
            {/* Drag handle (left) */}
            <TouchableOpacity
              style={styles.dragHandle}
              onLongPress={handleBeginDrag} // Use onLongPress with our handler
              delayLongPress={150}
            >
              <MaterialCommunityIcons
                name="menu"
                size={28}
                color={theme.text}
              />
            </TouchableOpacity>

            {/* Pill name (center - clickable for edit) */}
            <TouchableOpacity
              style={styles.pillNameContainer}
              onPress={() => onPillEdit(item)}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.pillName}>{item.name}</ThemedText>
              <ThemedText style={styles.pillInfo}>
                {item.intakes} intake{item.intakes !== 1 ? "s" : ""} per day
              </ThemedText>
            </TouchableOpacity>

            {/* Delete button (right) */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                Alert.alert(
                  "Delete Pill",
                  `Are you sure you want to delete ${item.name}?`,
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      onPress: () => onPillDelete(item.name),
                      style: "destructive",
                    },
                  ]
                )
              }
            >
              <Ionicons name="trash-outline" size={24} color={theme.red} />
            </TouchableOpacity>
          </View>
        </ScaleDecorator>
      );
    },
    [theme, onPillEdit, onPillDelete]
  );

  // Check if there are no pills
  const noPills = !data || data.length === 0;

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.modalBackground },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerLeftButton}>
              <SmallTextButton onPress={onClose}>
                <ThemedText style={[styles.headerText, { color: theme.red }]}>
                  Cancel
                </ThemedText>
              </SmallTextButton>
            </View>
            <ThemedText type="title" style={styles.title}>
              Reorder Pills
            </ThemedText>
            <View style={styles.headerRightPlaceholder} />
          </View>

          {noPills ? (
            <View style={styles.noContentContainer}>
              <ThemedText style={styles.noContentText}>
                No pills added yet
              </ThemedText>
            </View>
          ) : (
            <>
              <ThemedText style={styles.instructions}>
                Drag the handles to reorder your pills
              </ThemedText>
              <View style={styles.listContainer}>
                <DraggableFlatList
                  data={data}
                  onDragEnd={handleDragEnd}
                  keyExtractor={(item) => item?.id || item?.name || "unknown"}
                  renderItem={renderItem}
                  contentContainerStyle={styles.listContentContainer}
                />
              </View>
            </>
          )}

          <DefaultButton
            onPress={onClose}
            style={styles.doneButton}
            defaultColor={theme.yellow}
            defaultTextColor={theme.white}
          >
            Done
          </DefaultButton>

          {isUpdating && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.yellow} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeftButton: {
    width: 100,
    alignItems: "flex-start",
  },
  headerRightPlaceholder: {
    width: 100,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    flex: 1,
  },
  noContentContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    marginBottom: 16,
  },
  noContentText: {
    opacity: 0.7,
  },
  instructions: {
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.7,
  },
  listContainer: {
    minHeight: 100,
    maxHeight: 350, // Ensure there's enough space to see multiple pills
    marginBottom: 16,
  },
  listContentContainer: {
    paddingBottom: 8,
  },
  pillItem: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    padding: 12,
    alignItems: "center",
  },
  dragHandle: {
    padding: 10,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  pillNameContainer: {
    flex: 1,
    paddingVertical: 4,
  },
  pillName: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  pillInfo: {
    fontSize: 14,
    opacity: 0.7,
  },
  deleteButton: {
    padding: 10,
    marginLeft: 4,
  },
  doneButton: {
    marginBottom: 8,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
