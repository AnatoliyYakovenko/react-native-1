import * as ImagePicker from "expo-image-picker";

export const handleImage = async (setImage) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });
  if (result.canceled) {
    return;
  }
  setImage(result.assets[0].uri);
};
