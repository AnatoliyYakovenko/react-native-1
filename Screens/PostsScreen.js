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

  const handleComment = (photo) => {
    navigation.navigate("Comment", { photo });
  };
  const handleMap = (coordinates, title, location) => {
    navigation.navigate("Map", { coordinates, title, location });
  };

  return (
    <View style={styles.container}>
      <View style={styles.postsList}>
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
                <Pressable
                  onPress={() => {
                    handleComment(item.photo);
                  }}
                >
                  <View style={styles.commentsWrapper}>
                    <Feather name="message-circle" size={24} color="#BDBDBD" />
                    <Text style={styles.commentsNumber}>0</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    handleMap(item.coordinates, item.title, item.location);
                  }}
                >
                  <View style={styles.locationWrapper}>
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.locationName}>{item.location}</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
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
  postsList: {
    width: "100%",
    paddingBottom: 50,
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
    gap: 49,
  },
  commentsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  commentsNumber: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    lineHeight: 19,
  },
  locationWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  locationName: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
