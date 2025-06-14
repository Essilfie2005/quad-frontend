import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { posts } from "../../constants/posts";

const user = {
  avatar: "https://i.pravatar.cc/150?img=15",
  displayName: "Essilfie David",
  username: "essilfie_d",
  bio: "CS Student | Building QUAD 💻 | Anime & Football lover ⚽️",
  followers: 120,
  following: 75,
};

export default function ProfileScreen() {
  const userPosts = posts.filter((post) => post.username === user.username);

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.displayName}>{user.displayName}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
          <View style={styles.followRow}>
            <Text style={styles.followText}>
              <Text style={styles.bold}>{user.followers}</Text> Followers
            </Text>
            <Text style={styles.followText}>
              <Text style={styles.bold}>{user.following}</Text> Following
            </Text>
          </View>
        </View>
      </View>

      {/* Posts (optional) */}
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  topSection: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  displayName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    color: "gray",
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    marginVertical: 6,
  },
  followRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  followText: {
    fontSize: 14,
    color: "#555",
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  post: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 14,
  },
});
