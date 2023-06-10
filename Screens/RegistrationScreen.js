import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../redux/auth/authOperations";
import { handleImage } from "../utils/imagePicker";
import Icon from "@expo/vector-icons/Feather";
import Toast from "react-native-toast-message";

export default function RegistrationScreen() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const resetForm = () => {
    setLogin("");
    setEmail("");
    setPassword("");
    setAvatar(null);
  };
  const onRegister = () => {
    if (email === "" || password === "" || login === "") {
      Toast.show({ type: "error", text1: "Заповніть всі поля" });
      return;
    }
    const user = {
      login: login.trim(),
      email: email.trim(),
      password: password.trim(),
      avatar,
    };
    dispatch(authSignUpUser(user));
    resetForm();
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
            <View style={styles.addImage}>
              {avatar ? (
                <Image style={styles.avatar} source={{ uri: avatar }} />
              ) : null}
              <Pressable
                style={styles.addImageBtn}
                onPress={() => handleImage(setAvatar)}
                accessibilityLabel={"Add avatar"}
              >
                {avatar ? (
                  <View style={styles.removeImageBtnImage}>
                    <Icon name="plus" size={25} color="#BDBDBD" />
                  </View>
                ) : (
                  <View style={styles.addImageBtnImage}>
                    <Icon name="plus" size={25} color="#FF6C00" />
                  </View>
                )}
              </Pressable>
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
                  value={login}
                  onChangeText={setLogin}
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
                    borderColor: focused === "password" ? "#FF6C00" : "#E8E8E8",
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
            <TouchableOpacity style={styles.regBtn} onPress={onRegister}>
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
  },
  avatar: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  addImage: {
    position: "relative",
    alignSelf: "center",
    marginTop: -92,
    marginBottom: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  addImageBtn: {
    position: "absolute",
    bottom: 14,
    right: -12,
    borderRadius: 50,
  },
  addImageBtnImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "#ffffff",
  },
  removeImageBtnImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    backgroundColor: "#ffffff",
    transform: [{ rotate: "45deg" }],
  },
  // avatar: {
  //   marginTop: -92,
  //   alignSelf: "center",
  //   width: 120,
  //   height: 120,
  //   backgroundColor: "#F6F6F6",
  //   borderRadius: 16,
  // },
  // avatarBtn: {
  //   width: 25,
  //   height: 25,
  //   alignSelf: "center",
  //   marginTop: -39,
  //   marginRight: -119.5,
  // },
  // addAvatar: {
  //   backgroundColor: "#fff",
  //   borderRadius: 25,
  //   borderWidth: 1,
  //   borderColor: "#FF6C00",
  //   textAlign: "center",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // addAvatar: {
  //   position: "relative",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   marginTop: -60,
  //   marginBottom: 32,
  //   width: 120,
  //   height: 120,
  //   backgroundColor: "#F6F6F6",
  //   borderRadius: 16,
  // },
  // addAvatarBtn: {
  //   position: "absolute",
  //   bottom: 14,
  //   right: -12,
  //   width: 25,
  //   height: 25,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 50,
  //   borderWidth: 1,
  //   borderColor: "#FF6C00",
  //   backgroundColor: "#FFF",
  // },
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
