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

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <Text>Поки що немає коментарів...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
