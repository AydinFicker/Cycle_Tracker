import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.middlegrey,
          },
        ]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.text}>{value || "Select your situation"}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={theme.black}
        />
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.middlegrey,
            },
          ]}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                index !== options.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: theme.background,
                },
              ]}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text style={styles.text}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
    position: "relative",
    zIndex: 1,
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
    color: "#000",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    borderRadius: 15,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  option: {
    padding: 16,
  },
});
