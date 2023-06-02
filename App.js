import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLogin = () => {
    Alert.alert("Credentials", `${name} +${email} + ${password}`);
  };

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
        <View style={styles.regFormWrapper}>
          <Text style={styles.regFormTitle}>Реєстрація</Text>
          <View style={styles.regFormInputWrapper}>
            <TextInput
              style={styles.regFormInput}
              placeholder="Логін"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.regFormInput}
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.regFormInput}
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.regBtn} onPress={onLogin}>
            <Text style={styles.regBtnTitle}>Зареєстуватися</Text>
          </TouchableOpacity>
          <Text style={styles.regIsLogin}>Вже є акаунт? Увійти</Text>
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
  regFormWrapper: {
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
  regFormTitle: {
    paddingTop: 92,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },
  regFormInputWrapper: {
    gap: 16,
    marginTop: 32,
  },
  regFormInput: {
    height: 50,
    marginHorizontal: 16,
    paddingStart: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    columnGap: 16,
  },
  regBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginHorizontal: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    borderColor: "black",
  },
  regBtnTitle: {
    fontFamily: "Roboto-Regular",
    color: "#FFF",
  },
  regIsLogin: {
    marginTop: 16,
    paddingBottom: 45,
    textAlign: "center",
    fontSize: 16,
    color: "#1B4371",
  },
});
