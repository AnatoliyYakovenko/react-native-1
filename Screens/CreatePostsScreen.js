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
  const [photo, setPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  // const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);

  // const takePhoto = async () => {
  //   const { uri } = await camera.takePictureAsync();
  //   await MediaLibrary.createAssetAsync(uri);
  //   setPhoto(uri);
  const takePhoto = async () => {
    if (!isCameraReady) {
      console.log("Камера еще не готова. Подождите, пока она загрузится.");
      return;
    }
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={setCamera}
        onCameraReady={() => setIsCameraReady(true)}
      >
        {photo && (
          <Image
            source={{ uri: photo }}
            style={{ height: 220, width: 220, marginTop: -80 }}
          />
        )}
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
