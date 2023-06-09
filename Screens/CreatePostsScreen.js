import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import {
  //   ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  //   KeyboardAvoidingView,
  //   TouchableWithoutFeedback,
  //   Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(null);

  // const takePhoto = async () => {
  //   const { uri } = await camera.takePictureAsync();
  //   await MediaLibrary.createAssetAsync(uri);
  //   setPhoto(uri);

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
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.log("Permission to access location was denied");
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     const coords = {
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     };
  //     setLocation(coords);
  //   })();
  // }, []);

  const takePhoto = async () => {
    if (!isCameraReady) {
      console.log("Камера еще не готова. Подождите, пока она загрузится.");
      return;
    }
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const resetForm = () => {
    setPhoto(null);
    setTitle("");
    setLocation(null);
  };

  const sendPost = () => {
    navigation.navigate("Posts", { photo, title, location });
    resetForm();
  };

  //   const onSubmit = async () => {
  //     if (photo === null && location === '') {
  //         Toast.show({
  //             type: 'error',
  //             text1: 'There are must be photo and title',
  //         });
  //         return;
  //     }
  //         await uploadPost();
  //         navigation.navigate('PostsScreen');
  //         resetPhotoState();
  //         setTitle('');
  //         setLocation('');
  // };

  console.log(location);

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={setCamera}
        type={type}
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
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Назва..."
        placeholderTextColor={"#BDBDBD"}
        style={styles.postTitle}
      />
      <View style={styles.inputContainer}>
        <AntDesign name="enviromento" size={24} color="#BDBDBD" />
        <TextInput
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="Месцевість..."
          placeholderTextColor={"#BDBDBD"}
          style={styles.postLocation}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.publishBtn}
        // onPress={onSubmit}
      >
        <Text style={styles.publishBtnTitle} onPress={sendPost}>
          Опубліковати
        </Text>
      </TouchableOpacity>
      <Pressable style={styles.deleteBtn}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    marginTop: 32,
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
