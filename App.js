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
} from "react-native";
import { useFonts } from "expo-font";
import Icon from "@expo/vector-icons/Feather";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
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
  console.log(isShowKeyboard);
  return (
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
              ...styles.regFormWrapper,
              paddingBottom: isShowKeyboard ? 50 : 10,
            }}
          >
            <View style={styles.addAvatar}>
              {/* <Image
              source={require("./assets/icon.png")}
              style={styles.avatar}
            /> */}
              <View style={styles.addAvatarBtn}>
                <Icon name="plus" size={18} color="#FF6C00" />
              </View>
            </View>
            <Text style={styles.regFormTitle}>Реєстрація</Text>
            <View style={styles.regFormInputWrapper}>
              <TextInput
                style={styles.regFormInput}
                placeholder="Логін"
                value={name}
                onChangeText={setName}
                // onFocus={() => {
                //   setIsShowKeyboard(true);
                // }}
              />

              <TextInput
                style={styles.regFormInput}
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
                // onFocus={() => {
                //   setIsShowKeyboard(true);
                // }}
              />
              <TextInput
                style={styles.regFormInput}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
              />
              <Text style={styles.regShowPasswordBtn}>Показати</Text>
            </View>
            <TouchableOpacity style={styles.regBtn} onPress={onLogin}>
              <Text style={styles.regBtnTitle}>Зареєстуватися</Text>
            </TouchableOpacity>
            <Text style={styles.regIsLogin}>Вже є акаунт? Увійти</Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  regFormWrapper: {
    position: "relative",
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  addAvatar: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -60,
    marginBottom: 32,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatarBtn: {
    position: "absolute",
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "#FFF",
  },
  regFormTitle: {
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
  regShowPasswordBtn: {
    position: "absolute",
    bottom: 32,
    right: 32,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
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
    fontSize: 16,
    lineHeight: 19,
    color: "#FFF",
  },
  regIsLogin: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 16,
    color: "#1B4371",
  },
});
