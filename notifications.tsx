import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Sample Data
const notifications = [
  {
    id: "1",
    type: "like",
    user: {
      name: "John Doe",
      username: "johndoe",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    content: "liked your post",
    time: "2h",
  },
  {
    id: "2",
    type: "mention",
    user: {
      name: "Jane Smith",
      username: "janesmith",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    content: "mentioned you in a post",
    time: "5h",
  },
  {
    id: "3",
    type: "verified",
    user: {
      name: "Elon Musk",
      username: "elonmusk",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    content: "retweeted your post",
    time: "1d",
  },
];

const categories = ["All", "Verified", "Mentions"];

export default function NotificationScreen() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNotifications = notifications.filter((item) => {
    if (activeCategory === "All") return true;
    return item.type === activeCategory.toLowerCase();
  });

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=5" }}
          style={styles.avatar}
        />
        <Text style={styles.heading}>Notifications</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setActiveCategory(category)}
            style={[
              styles.tab,
              activeCategory === category && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeCategory === category && styles.activeTabText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notification List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 12 }}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Image source={{ uri: item.user.avatar }} style={styles.notifAvatar} />
            <View style={styles.notifTextContainer}>
              <Text style={styles.notifText}>
                <Text style={styles.notifBold}>{item.user.name}</Text> {item.content}
              </Text>
              <Text style={styles.notifTime}>{item.time} ago</Text>
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
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tab: {
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#1DA1F2",
  },
  activeTabText: {
    color: "#1DA1F2",
    fontWeight: "bold",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  notifAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  notifTextContainer: {
    flex: 1,
  },
  notifText: {
    fontSize: 15,
  },
  notifBold: {
    fontWeight: "bold",
  },
  notifTime: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
});
