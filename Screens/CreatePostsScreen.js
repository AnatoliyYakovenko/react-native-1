import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";

export default function CreatePostsScreen({ navigation }) {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [title, setTitle] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [location, setLocation] = useState(null);

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setIsKeyboardShown(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync();
      setCoordinates({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    })();
  };

  const takePhoto = async () => {
    if (!isCameraReady) {
      Toast.show({
        type: "info",
        text1: "Камера ще не готова",
      });
      return;
    }
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };
  const resetPhotoState = () => {
    setPhoto(null);
  };
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const resetForm = () => {
    setPhoto(null);
    setTitle("");
    setLocation(null);
  };
  const handleDeletePost = (e) => {
    e.preventDefault();
    resetForm();
    Toast.show({
      type: "info",
      text1: "Дані видалено",
    });
  };

  // const sendPost = () => {
  //   navigation.navigate("Posts", { photo, title, location });
  //   resetForm();
  // };

  const onSubmit = () => {
    getLocation();
    navigation.navigate("Posts", { photo, title, location, coordinates });
    resetForm();
  };

  console.log(coordinates);

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,
              paddingTop: isKeyboardShown ? 0 : 32,
            }}
          >
            {photo ? (
              <View style={styles.photoWrapper}>
                <Image style={styles.camera} source={{ uri: photo }} />
                <Pressable
                  style={styles.cameraOnPhotoBtn}
                  onPress={resetPhotoState}
                >
                  <AntDesign name="camera" size={24} color="#FFFFFF" />
                </Pressable>
              </View>
            ) : (
              <View style={styles.cameraWrapper}>
                <Camera
                  style={styles.camera}
                  type={type}
                  ref={setCamera}
                  onCameraReady={() => setIsCameraReady(true)}
                >
                  <Pressable style={styles.cameraBtn} onPress={takePhoto}>
                    <AntDesign name="camera" size={24} color="#BDBDBD" />
                  </Pressable>

                  <View style={{ position: "absolute", right: 10, bottom: 10 }}>
                    <TouchableOpacity onPress={toggleCameraType}>
                      <MaterialIcons
                        name="flip-camera-android"
                        size={24}
                        color="#BDBDBD"
                      />
                    </TouchableOpacity>
                  </View>
                </Camera>
              </View>
            )}
            <Pressable>
              <Text style={styles.addImage}>
                {!photo ? "Завантажте фото" : "Редагувати фото"}
              </Text>
            </Pressable>
            <TextInput
              value={title}
              onChangeText={(text) => setTitle(text)}
              placeholder="Назва..."
              placeholderTextColor={"#BDBDBD"}
              style={styles.postTitle}
              onFocus={() => {
                setIsKeyboardShown(true);
              }}
              onBlur={() => {
                setIsKeyboardShown(false);
              }}
            />
            <View style={styles.inputContainer}>
              <AntDesign name="enviromento" size={24} color="#BDBDBD" />
              <TextInput
                value={location}
                onChangeText={(text) => setLocation(text)}
                placeholder="Месцевість..."
                placeholderTextColor={"#BDBDBD"}
                style={styles.postLocation}
                onFocus={() => {
                  setIsKeyboardShown(true);
                }}
                onBlur={() => {
                  setIsKeyboardShown(false);
                }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.publishBtn}
              onPress={onSubmit}
            >
              <Text style={styles.publishBtnTitle}>Опубліковати</Text>
            </TouchableOpacity>
            <Pressable style={styles.deleteBtn} onPress={handleDeletePost}>
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
  },
  form: {
    paddingTop: 32,
  },
  photoWrapper: {
    position: "relative",
    backgroundColor: "#F6F6F6",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  cameraWrapper: {
    backgroundColor: "#F6F6F6",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  cameraBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  cameraOnPhotoBtn: {
    position: "absolute",
    top: 90,
    left: "42%",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  addImage: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    paddingTop: 6,
  },
  postTitle: {
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  postLocation: {
    paddingHorizontal: 0,
    marginLeft: 4,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#000",
  },
  publishBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 32,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  publishBtnTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  deleteBtn: {
    backgroundColor: "#F6F6F6",
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 120,
  },
});
