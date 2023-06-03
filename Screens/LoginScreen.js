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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
  const handleKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  const handleInputShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/bg.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.loginFormWrapper,
                marginBottom: isShowKeyboard ? -217 : 0,
              }}
            >
              <Text style={styles.loginFormTitle}>Увійти</Text>
              <View style={styles.loginFormInputWrapper}>
                <TextInput
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused("email");
                  }}
                  onBlur={() => {
                    setFocused("");
                  }}
                  style={{
                    ...styles.loginFormInput,
                    borderColor: focused === "email" ? "#FF6C00" : "#E8E8E8",
                  }}
                />
                <TextInput
                  placeholder="Пароль"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused("password");
                  }}
                  onBlur={() => {
                    setFocused("");
                  }}
                  style={{
                    ...styles.loginFormInput,
                    borderColor: focused === "password" ? "#FF6C00" : "#E8E8E8",
                  }}
                  secureTextEntry={!showPassword}
                />
                <Text
                  style={styles.loginShowPasswordBtn}
                  onPress={handleInputShow}
                >
                  Показати
                </Text>
              </View>
              <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
                <Text style={styles.loginBtnTitle}>Увійти</Text>
              </TouchableOpacity>
              <Text style={styles.loginHasAccount}>
                Немає акаунту?{" "}
                <Text style={styles.loginReg}>Зареєструватись</Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loginFormWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: 32,
    paddingBottom: 111,
    backgroundColor: "#FFF",
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loginFormTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },
  loginFormInputWrapper: {
    gap: 16,
    marginTop: 32,
  },
  loginFormInput: {
    height: 50,
    marginHorizontal: 16,
    paddingStart: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    columnGap: 16,
  },
  loginShowPasswordBtn: {
    position: "absolute",
    bottom: 32,
    right: 32,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  loginBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginHorizontal: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    borderColor: "black",
  },
  loginBtnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFF",
  },
  loginHasAccount: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 16,
    color: "#1B4371",
  },
  loginReg: {
    textDecorationLine: "underline",
  },
});
