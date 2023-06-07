import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import useRoute from "./router";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const routing = useRoute(true);

  if (!fontsLoaded) {
    return null;
  }
  return <NavigationContainer>{routing}</NavigationContainer>;
}
