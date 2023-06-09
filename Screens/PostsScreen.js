import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";

import {
  //   ImageBackground,
  StyleSheet,
  //   TextInput,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  //   TouchableOpacity,
  //   KeyboardAvoidingView,
  //   TouchableWithoutFeedback,
  //   Keyboard,
} from "react-native";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((PrevState) => [...PrevState, route.params]);
    }
  }, [route.params]);

  const handleComment = () => {
    navigation.navigate("Comment");
  };
  const handleMap = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={() =>
          posts.length <= 0 ? (
            <View>
              <Text>Поки що немає постів</Text>
            </View>
          ) : null
        }
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Image
              style={styles.postImage}
              source={{ uri: item.photo } ?? require("../assets/bg.png")}
            />
            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={styles.infoWrapper}>
              <Pressable onPress={handleComment}>
                <View style={styles.postDataCommentsWrapper}>
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                  <Text style={styles.postComments}>
                    {item.comments?.length ?? "0"}
                  </Text>
                </View>
              </Pressable>
              <Text>{item.location}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#ffffff",
  },
  postItem: {
    marginBottom: 32,
    flexDirection: "column",
    gap: 8,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  postTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
  },
  infoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
