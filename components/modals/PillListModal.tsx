import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { SmallTextButton } from "@/components/buttons/SmallTextButton";
import { DefaultButton } from "@/components/buttons/DefaultButton";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
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
  pills = [], // Provide default empty array
  onPillEdit,
  onPillDelete,
  onPillsReorder,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  // Store the displayed pills to prevent jumps on state changes
  const [displayPills, setDisplayPills] = useState<Pill[]>([]);

  // Use a ref to track if a drag operation is in progress
  const isDraggingRef = useRef(false);

  // Track currently active pill
  const [activePillName, setActivePillName] = useState<string | null>(null);
  const [activePill, setActivePill] = useState<{
    isActive: boolean;
    pill: Pill | null;
  }>({
    isActive: false,
    pill: null,
  });

  // Create shared animation values (at component level)
  const activeOpacity = useSharedValue(1);
  const activeScale = useSharedValue(1);

  // Create a list of unique pills based on name
  const uniquePills = useMemo(() => {
    if (!pills || !Array.isArray(pills) || pills.length === 0) {
      return [];
    }

    const pillMap = new Map<string, Pill>();

    pills.forEach((pill) => {
      if (pill && pill.name && !pillMap.has(pill.name)) {
        pillMap.set(pill.name, pill);
      }
    });

    return Array.from(pillMap.values());
  }, [pills]);

  // Initialize display pills when visible changes or pills change (but not during drag)
  useEffect(() => {
    if (isVisible && !isDraggingRef.current) {
      setDisplayPills(uniquePills);
    }
  }, [isVisible, uniquePills, pills]);

  // Handle active pill animations separately from the render function
  useEffect(() => {
    if (activePill.isActive && activePill.pill) {
      activeOpacity.value = withSpring(0.5, {
        damping: 20,
        stiffness: 200,
      });
      activeScale.value = withSpring(1.05, {
        damping: 20,
        stiffness: 200,
      });
      setActivePillName(activePill.pill.name);
    } else if (!activePill.isActive && activePillName) {
      activeOpacity.value = withSpring(1, {
        damping: 20,
        stiffness: 200,
      });
      activeScale.value = withSpring(1, {
        damping: 20,
        stiffness: 200,
      });
      setActivePillName(null);
    }
  }, [activePill, activeOpacity, activeScale]);

  // Track reordering state to avoid visual jumps
  const [isReordering, setIsReordering] = useState(false);

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Pill>) => {
      // Safety check for valid item
      if (!item || !item.name) {
        console.warn("Invalid pill item in renderItem:", item);
        return null;
      }

      // Update active pill in the next tick, not during render
      React.useEffect(() => {
        const newActivePill = {
          isActive,
          pill: isActive ? item : null,
        };

        // Only update if there's a change to prevent render loops
        if (
          isActive !== activePill.isActive ||
          (isActive && activePill.pill?.name !== item.name)
        ) {
          setActivePill(newActivePill);
        }
      }, [isActive, item]);

      // Count how many pills have this name to show intake count - with safety checks
      const pillsWithSameName = Array.isArray(pills)
        ? pills.filter((p) => p && p.name === item.name).length
        : 0;

      const animatedStyle = useAnimatedStyle(() => ({
        opacity: activePillName === item.name ? activeOpacity.value : 1,
        transform: [
          { scale: activePillName === item.name ? activeScale.value : 1 },
        ],
      }));

      return (
        <ScaleDecorator>
          <Animated.View style={animatedStyle}>
            <TouchableOpacity
              onLongPress={drag}
              disabled={isActive || isReordering}
              style={[
                styles.pillItem,
                { backgroundColor: theme.buttonBackground },
              ]}
            >
              <View style={styles.pillItemContent}>
                <TouchableOpacity
                  onPressIn={drag}
                  style={styles.dragHandle}
                  disabled={isReordering}
                >
                  <Ionicons name="menu" size={24} color={theme.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pillInfo}
                  onPress={() => onPillEdit(item)}
                  disabled={isReordering}
                >
                  <ThemedText style={styles.pillName}>{item.name}</ThemedText>
                  <ThemedText style={styles.pillDetails}>
                    {pillsWithSameName} intake{pillsWithSameName > 1 ? "s" : ""}{" "}
                    per day
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => onPillEdit(item)}
                  disabled={isReordering}
                >
                  <Ionicons
                    name="settings-outline"
                    size={24}
                    color={theme.text}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </ScaleDecorator>
      );
    },
    [
      activeOpacity,
      activeScale,
      activePillName,
      activePill,
      onPillEdit,
      pills,
      theme,
      isReordering,
    ]
  );

  const handleDragStart = useCallback(() => {
    setIsReordering(true);
    isDraggingRef.current = true;
  }, []);

  const handleDragEnd = useCallback(
    ({ data }: { data: Pill[] }) => {
      if (!data || !Array.isArray(data) || data.length === 0) {
        setIsReordering(false);
        isDraggingRef.current = false;
        return;
      }

      // Update the display list immediately to maintain the visual order
      setDisplayPills(data);

      // Create a mapping of original positions to new positions
      const newOrderMap = new Map<string, number>();
      data.forEach((pill, index) => {
        if (pill && pill.name) {
          newOrderMap.set(pill.name, index);
        }
      });

      // Sort all pills based on the new order of their names
      const reorderedPills = [...pills].sort((a, b) => {
        if (!a || !a.name || !b || !b.name) return 0;
        const orderA = newOrderMap.get(a.name) ?? 0;
        const orderB = newOrderMap.get(b.name) ?? 0;
        return orderA - orderB;
      });

      // Apply the reordering after a longer delay to ensure animations complete
      const timerId = setTimeout(() => {
        onPillsReorder(reorderedPills);
        setIsReordering(false);
        // Only clear the dragging flag after the reorder completes
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 200);
      }, 700);

      // Clean up timer if component unmounts
      return () => clearTimeout(timerId);
    },
    [pills, onPillsReorder]
  );

  // For cleaning up animations when modal closes
  useEffect(() => {
    if (!isVisible) {
      setActivePillName(null);
      setActivePill({ isActive: false, pill: null });
      setIsReordering(false);
      isDraggingRef.current = false;
    }
  }, [isVisible]);

  // If we have no pills, show a message instead
  const noPills = !displayPills || displayPills.length === 0;

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
          {/* Header */}
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
                No pills to reorder. Add pills first.
              </ThemedText>
            </View>
          ) : (
            <>
              <ThemedText style={styles.instructions}>
                Drag the handles to reorder your pills
              </ThemedText>

              {/* Pills List */}
              <View style={styles.listContainer}>
                <DraggableFlatList
                  data={displayPills}
                  onDragEnd={handleDragEnd}
                  onDragBegin={handleDragStart}
                  keyExtractor={(item) => item?.id || item?.name || "unknown"}
                  renderItem={renderItem}
                  contentContainerStyle={styles.listContentContainer}
                  dragHitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  animationConfig={{
                    damping: 20,
                    stiffness: 200,
                  }}
                />
              </View>
            </>
          )}

          {/* Done Button */}
          <DefaultButton
            onPress={onClose}
            style={styles.doneButton}
            defaultColor={theme.yellow}
            defaultTextColor={theme.white}
          >
            Done
          </DefaultButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 32,
    height: "80%",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    flex: 1,
  },
  instructions: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  placeholder: {
    width: 50,
  },
  listContainer: {
    flex: 1,
    marginBottom: 16,
  },
  listContentContainer: {
    paddingHorizontal: 20,
  },
  pillItem: {
    borderRadius: 12,
    marginVertical: 6,
    overflow: "hidden",
  },
  pillItemContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  dragHandle: {
    padding: 6,
    marginRight: 12,
  },
  pillInfo: {
    flex: 1,
  },
  pillName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  pillDetails: {
    fontSize: 14,
    opacity: 0.6,
  },
  editButton: {
    padding: 8,
  },
  doneButton: {
    marginTop: 16,
    width: "90%",
    alignSelf: "center",
  },
  noContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noContentText: {
    textAlign: "center",
    opacity: 0.6,
    fontSize: 16,
  },
});
