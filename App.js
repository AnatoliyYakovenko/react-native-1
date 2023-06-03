import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";

export default function App() {

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLogin = () => {
    Alert.alert("Credentials", `${email} + ${password}`);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
  )
}