import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Mock communities
const communities = [
  {
    id: "1",
    name: "React Native Devs",
    members: "15.2K",
    avatar: "https://i.pravatar.cc/150?img=11",
    joined: true,
  },
  {
    id: "2",
    name: "Anime Watchers",
    members: "89K",
    avatar: "https://i.pravatar.cc/150?img=12",
    joined: false,
  },
  {
    id: "3",
    name: "Football Fans",
    members: "230K",
    avatar: "https://i.pravatar.cc/150?img=13",
    joined: false,
  },
  {
    id: "4",
    name: "Crypto Heads",
    members: "53K",
    avatar: "https://i.pravatar.cc/150?img=14",
    joined: true,
  },
];

const tabs = ["Joined", "Discover"];

export default function CommunitiesScreen() {
  const [activeTab, setActiveTab] = useState("Joined");

  const filtered = communities.filter((c) =>
    activeTab === "Joined" ? c.joined : !c.joined
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=7" }}
          style={styles.avatar}
        />
        <Text style={styles.title}>Communities</Text>
        <Ionicons name="add-circle-outline" size={24} color="#1DA1F2" />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Community List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16 }}
        renderItem={({ item }) => (
          <View style={styles.communityItem}>
            <Image source={{ uri: item.avatar }} style={styles.communityAvatar} />
            <View style={styles.communityInfo}>
              <Text style={styles.communityName}>{item.name}</Text>
              <Text style={styles.communityMembers}>{item.members} members</Text>
            </View>
            {activeTab === "Discover" && (
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            )}
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
    justifyContent: "space-between",
    marginBottom: 16,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tab: {
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  tabText: {
    fontSize: 14,
    color: "#777",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#1DA1F2",
  },
  activeTabText: {
    color: "#1DA1F2",
    fontWeight: "bold",
  },
  communityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  communityAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  communityMembers: {
    color: "gray",
    fontSize: 13,
  },
  joinButton: {
    backgroundColor: "#1DA1F2",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
