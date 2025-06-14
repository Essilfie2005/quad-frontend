import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const mockMessages = [
  {
    id: "1",
    name: "Elon Musk",
    username: "elonmusk",
    message: "Let's talk rockets 🚀",
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "2h",
  },
  {
    id: "2",
    name: "Central Cee",
    username: "cen_cee",
    message: "Yo bro 🔥",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "3h",
  },
  {
    id: "3",
    name: "Sora",
    username: "openaimagic",
    message: "The future is cinematic.",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "5h",
  },
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Message Requests */}
      <TouchableOpacity style={styles.requestsBox}>
        <Text style={styles.requestsText}>Message requests</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      {/* Messages List */}
      <FlatList
        data={mockMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.messageCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.messageInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.username}>@{item.username}</Text>
              <Text numberOfLines={1} style={styles.preview}>
                {item.message}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Message Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="create-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  requestsBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  requestsText: {
    fontSize: 16,
    fontWeight: "500",
  },
  messageCard: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  username: {
    color: "gray",
    marginBottom: 4,
  },
  preview: {
    fontSize: 15,
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#1DA1F2",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
