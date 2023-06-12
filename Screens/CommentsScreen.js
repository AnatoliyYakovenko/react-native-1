import { useState, useEffect } from "react";
import {
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
  SafeAreaView,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CommentsScreen({ route }) {
  const photo = route.params.photo;

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  //   useEffect(() => {
  //     if (comments) {
  //       setComments((PrevState) => [...PrevState, comments]);
  //     }
  //   }, []);

  const handleKeyboard = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  const handleSubmitComment = () => {
    const date = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const commentData = {
      timestamp: Date.now().toString(),
      text,
      date,
      time,
    };
    setComments(commentData);
    setText("");
    handleKeyboard();
  };
  //   console.log(comments);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView keyboardVerticalOffset={40} behavior="position">
        <TouchableWithoutFeedback onPress={handleKeyboard}>
          <View style={styles.imageWrapper}>
            <Image style={styles.postImage} source={{ uri: photo }} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.commentsList}>
          {/* <FlatList
            ListEmptyComponent={() =>
              comments.length <= 0 ? (
                <View style={styles.emptyMessageBox}>
                  <Text style={styles.emptyMessageStyle}>
                    Поки що немає коментарів...
                  </Text>
                </View>
              ) : null
            }
            data={comments} */}
          {/* renderItem={({ item, index }) => ( */}
          <TouchableWithoutFeedback onPress={handleKeyboard}>
            <View style={styles.commentBox}>
              <View style={styles.commentTextWrapper}>
                <Text style={styles.commentText}>{comments.text}</Text>
                <Text style={styles.commentDate}>
                  {/* {item.date} | {item.time} */}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {/* )} */}
          {/* keyExtractor={(item, index) => index.toString()}
          /> */}
        </View>
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
            value={text}
            multiline
            autoFocus={false}
            selectionColor="#FF6C00"
            blurOnSubmit={true}
            placeholderTextColor="#BDBDBD"
            onChangeText={(text) => {
              setText(text);
            }}
            onFocus={() => {
              setShowKeyboard(true);
            }}
            onBlur={() => {
              setShowKeyboard(false);
            }}
            placeholder="Коментарій..."
          ></TextInput>
          <Pressable style={styles.addCommentBtn} onPress={handleSubmitComment}>
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
    display: "flex",
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
  commentsList: {
    // marginTop: 24,
    height: 323,
    // width: "100%",
  },
  commentBox: {
    // marginBottom: 24,
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // gap: 16,
  },
  commentTextWrapper: {
    // backgroundColor: "rgba(0, 0, 0, 0.03)",
    // borderRadius: 6,
    // padding: 16,
    // width: 300,
    // flexGrow: 1,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
    lineHeight: 18,
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",

    lineHeight: 12,
    textAlign: "right",
  },

  commentAvatar: {
    borderRadius: 50,
    width: 28,
    height: 28,
    backgroundColor: "#BDBDBD",
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
  emptyMessageBox: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessageStyle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
    textAlign: "center",
  },
});
