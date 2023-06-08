import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  //   ImageBackground,
  StyleSheet,
  //   TextInput,
  Text,
  View,
  Pressable,
  //   TouchableOpacity,
  //   KeyboardAvoidingView,
  //   TouchableWithoutFeedback,
  //   Keyboard,
} from "react-native";
import { Camera } from "expo-camera";

export default function CreatePostsScreen() {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <Pressable style={styles.cameraBtn} onPress={takePhoto}>
          <AntDesign name="camera" size={24} color="#BDBDBD" />
        </Pressable>
      </Camera>
      <Pressable>
        <Text style={styles.addImage}>
          {!photo ? "Завантажте фото" : "Редагувати фото"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  cameraBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  addImage: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    paddingTop: 6,
  },
});
