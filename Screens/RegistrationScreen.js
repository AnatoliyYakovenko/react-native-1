import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
import Icon from "@expo/vector-icons/Feather";

export default function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const onLogin = () => {
    console.log("Credentials", `${name} +${email} + ${password}`);
  };

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
          source={require("../assets/bg.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.regFormWrapper}>
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
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.regFormInputWrapper,
                  paddingBottom: isShowKeyboard ? 159 : 43,
                }}
              >
                <TextInput
                  placeholder="Логін"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused("login");
                  }}
                  onBlur={() => {
                    setIsShowKeyboard(false);
                    setFocused("");
                  }}
                  style={{
                    ...styles.regFormInput,
                    borderColor: focused === "login" ? "#FF6C00" : "#E8E8E8",
                  }}
                />
                <TextInput
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused("email");
                  }}
                  onBlur={() => {
                    setIsShowKeyboard(false);
                    setFocused("");
                  }}
                  style={{
                    ...styles.regFormInput,
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
                    setIsShowKeyboard(false);
                    setFocused("");
                  }}
                  style={{
                    ...styles.regFormInput,
                    borderColor: focused === "email" ? "#FF6C00" : "#E8E8E8",
                  }}
                  secureTextEntry={!showPassword}
                />
                <Text
                  style={styles.regShowPasswordBtn}
                  onPress={handleInputShow}
                >
                  {showPassword ? "Приховати" : "Показати"}
                </Text>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.regBtn} onPress={onLogin}>
              <Text style={styles.regBtnTitle}>Зареєстуватися</Text>
            </TouchableOpacity>
            <Text style={styles.regIsLogin}>
              Вже є акаунт?{" "}
              <Text
                style={styles.loginReg}
                onPress={() => navigation.navigate("Login")}
              >
                Увійти
              </Text>
            </Text>
          </View>
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
  regFormWrapper: {
    width: "100%",
    paddingBottom: 78,
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
    position: "relative",
    gap: 16,
    marginTop: 32,
  },
  regFormInput: {
    height: 50,
    marginHorizontal: 16,
    paddingStart: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    columnGap: 16,
  },
  regShowPasswordBtn: {
    position: "absolute",
    top: 148,
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
    // mrginTop: 43,a
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
