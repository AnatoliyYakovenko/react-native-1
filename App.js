import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/bg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.formWrapper}>
          <Text style={styles.formTitle}>Hello Native</Text>
        </View>

        <StatusBar style="auto" />
        {/* <Text style={styles.text}>Inside</Text> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  formWrapper: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formTitle: {
    paddingTop: 92,
    textAlign: "center",
    fontSize: 30,
  },
});
