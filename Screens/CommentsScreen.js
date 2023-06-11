import { useState } from "react";
import {
  //   ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  //   TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CommentsScreen({ route }) {
  const photo = route.params.photo;

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [comments, setComments] = useState([]);

  const handleKeyboard = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView keyboardVerticalOffset={40} behavior="position">
        <TouchableWithoutFeedback onPress={handleKeyboard}>
          <View style={styles.imageWrapper}>
            <Image style={styles.postImage} source={{ uri: photo }} />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            ...styles.commentInputWrapper,
            paddingBottom: showKeyboard && Platform.OS == "android" ? 32 : 16,
          }}
        >
          <TextInput
            style={
              comments
                ? { ...styles.commentInput, color: "#212121" }
                : styles.commentInput
            }
            value={comments}
            multiline
            autoFocus={false}
            selectionColor="#FF6C00"
            blurOnSubmit={true}
            placeholderTextColor="#BDBDBD"
            onChangeText={setComments}
            onFocus={() => {
              setShowKeyboard(true);
            }}
            onBlur={() => {
              setShowKeyboard(false);
            }}
            placeholder="Коментарій..."
          ></TextInput>
          <Pressable style={styles.addCommentBtn}>
            <AntDesign name="arrowup" size={20} color="#ffffff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  imageWrapper: {
    alignItems: "center",
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  commentInputWrapper: {
    position: "relative",
    alignSelf: "flex-end",
    width: "100%",
    marginTop: 16,
  },
  commentInput: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 50,
    paddingTop: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#BDBDBD",
    lineHeight: 19,
    textAlignVertical: "center",
  },
  addCommentBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
