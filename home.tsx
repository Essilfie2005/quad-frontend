import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { posts as initialPosts } from "../../constants/posts";

// Emoji array
const emojis = ["😂", "❤️", "🔥", "👍"];

// Feed item component
const FeedItem = ({ item }: { item: typeof initialPosts[0] }) => {
  const [liked, setLiked] = React.useState(false);
  const [retweets, setRetweets] = React.useState(item.retweets || 0);
  const [comments, setComments] = React.useState(item.comments || 0);
  const [selectedEmoji, setSelectedEmoji] = React.useState<string | null>(null);

  return (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.displayName}>
          {item.displayName} · <Text style={styles.timestamp}>{item.timestamp}</Text>
        </Text>
        <Text style={styles.username}>@{item.username}</Text>
        <Text style={styles.content}>{item.content}</Text>

        {/* Emoji Reactions */}
        <View style={styles.emojiRow}>
          {emojis.map((emoji) => (
            <TouchableOpacity
              key={emoji}
              style={[styles.emojiButton, selectedEmoji === emoji && styles.selectedEmoji]}
              onPress={() => setSelectedEmoji(selectedEmoji === emoji ? null : emoji)}
            >
              <Text style={styles.emojiText}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buttons row */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={() => setComments(comments + 1)}>
            <Ionicons name="chatbubble-outline" size={20} color="gray" />
            <Text style={styles.buttonText}>{comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setRetweets(retweets + 1)}>
            <Ionicons name="repeat-outline" size={20} color="gray" />
            <Text style={styles.buttonText}>{retweets}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              color={liked ? "red" : "gray"}
            />
            <Text style={styles.buttonText}>
              {liked ? item.likes + 1 : item.likes}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Home Feed screen
export default function HomeFeed() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"ForYou" | "Following">("ForYou");
  const [posts, setPosts] = React.useState(initialPosts);
  const [refreshing, setRefreshing] = React.useState(false);

  const filteredPosts =
    activeTab === "ForYou" ? posts : posts.filter((post) => post.isFollowing);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPosts([...initialPosts]);
      setRefreshing(false);
    }, 1500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Top Tabs */}
      <View style={styles.tabRow}>
        {["ForYou", "Following"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as "ForYou" | "Following")}
            style={styles.tabItem}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === "ForYou" ? "For You" : "Following"}
            </Text>
            {activeTab === tab && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Feed */}
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FeedItem item={item} />}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/tweet/new")}>
        <Ionicons name="create" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { paddingBottom: 80 },
  postContainer: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  textContainer: { flex: 1 },
  displayName: { fontWeight: "bold" },
  username: { color: "gray", marginBottom: 4 },
  timestamp: { color: "gray", fontWeight: "normal" },
  content: { marginBottom: 8 },
  emojiRow: { flexDirection: "row", marginBottom: 8 },
  emojiButton: { flexDirection: "row", alignItems: "center", marginHorizontal: 6 },
  selectedEmoji: {
    backgroundColor: "#e6f2ff",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  emojiText: { fontSize: 18 },
  buttonsRow: { flexDirection: "row", marginTop: 4 },
  button: { flexDirection: "row", alignItems: "center", marginRight: 18 },
  buttonText: { marginLeft: 4, color: "gray" },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1DA1F2",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  tabItem: { alignItems: "center" },
  tabText: { fontSize: 16, color: "gray" },
  activeTabText: { color: "#1DA1F2", fontWeight: "bold" },
  underline: {
    marginTop: 4,
    height: 3,
    backgroundColor: "#1DA1F2",
    width: "100%",
    borderRadius: 2,
  },
});
