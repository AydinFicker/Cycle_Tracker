import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  Modal,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface DropdownButtonProps {
  value: string;
  onSelect: (value: string) => void;
  options: string[];
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  value,
  onSelect,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const handleOptionPress = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.middlegrey,
          },
        ]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.text}>{value || "Select your situation"}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={theme.black}
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[styles.modalContent, { backgroundColor: theme.background }]}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  {
                    backgroundColor: theme.middlegrey,
                    borderBottomWidth: index !== options.length - 1 ? 1 : 0,
                    borderBottomColor: theme.background,
                  },
                ]}
                onPress={() => handleOptionPress(option)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
    marginTop: "75%",
  },
  button: {
    padding: 16,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxHeight: "80%",
    borderRadius: 15,
    overflow: "hidden",
  },
  option: {
    padding: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
