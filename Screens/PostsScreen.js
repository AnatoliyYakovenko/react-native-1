import {
  //   ImageBackground,
  StyleSheet,
  //   TextInput,
  Text,
  View,
  //   TouchableOpacity,
  //   KeyboardAvoidingView,
  //   TouchableWithoutFeedback,
  //   Keyboard,
} from "react-native";

export default function PostsScreen({ route }) {
  console.log("route.params", route.params);
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
