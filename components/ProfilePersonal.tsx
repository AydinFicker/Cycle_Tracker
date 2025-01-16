import React, { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface ProfilePersonalProps {
  children: ReactNode;
  onPress?: () => void;
}

export const ProfilePersonal: React.FC<ProfilePersonalProps> = ({
  children,
  onPress = () => {},
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.imageContainer,
          { backgroundColor: theme.buttonBackground },
        ]}
        activeOpacity={0.7}
      >
        <Ionicons name="person" size={40} color={theme.yellow} />
      </TouchableOpacity>
      <View style={styles.nameContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  nameContainer: {
    alignItems: "center",
  },
});
