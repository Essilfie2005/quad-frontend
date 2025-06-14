// app/(tabs)/search.tsx

import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Tabs
const categories = ["For You", "Trending", "News", "Sports", "Entertainment"];

// Trending Topics per Category
const trendingTopics = {
  "For You": [
    { id: "1", title: "React Native 2025", tweets: "120K Tweets" },
    { id: "2", title: "OpenAI GPT-5", tweets: "300K Tweets" },
  ],
  Trending: [
    { id: "3", title: "Champions League", tweets: "450K Tweets" },
    { id: "4", title: "Elections 2025", tweets: "220K Tweets" },
  ],
  News: [
    { id: "5", title: "NASA Mars Mission", tweets: "90K Tweets" },
    { id: "6", title: "UN Summit", tweets: "50K Tweets" },
  ],
  Sports: [
    { id: "7", title: "Cristiano Ronaldo", tweets: "600K Tweets" },
    { id: "8", title: "NBA Finals", tweets: "320K Tweets" },
  ],
  Entertainment: [
    { id: "9", title: "Dune: Part Three", tweets: "190K Tweets" },
    { id: "10", title: "Grammy Awards", tweets: "280K Tweets" },
  ],
};

// "Trending in UK" Section
const trendingInUK = [
  { id: "11", title: "London Tech Week", tweets: "20K Tweets" },
  { id: "12", title: "Premier League", tweets: "800K Tweets" },
];

// People to Follow
const peopleToFollow = [
  {
    id: "13",
    name: "Elon Musk",
    username: "elonmusk",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "14",
    name: "Rihanna",
    username: "rihanna",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("For You");

  const trending = trendingTopics[selectedCategory] || [];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search Quad"
        style={styles.searchInput}
        value={query}
        onChangeText={(text) => setQuery(text)}
      />

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.tabButton,
              selectedCategory === cat && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedCategory === cat && styles.activeTabText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trending Section */}
      <FlatList
        data={trending}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.trendingItem}>
            <Text style={styles.topic}>{item.title}</Text>
            <Text style={styles.tweets}>{item.tweets}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            {/* Trending in UK */}
            <Text style={styles.sectionTitle}>Trending in UK</Text>
            {trendingInUK.map((item) => (
              <View key={item.id} style={styles.trendingItem}>
                <Text style={styles.topic}>{item.title}</Text>
                <Text style={styles.tweets}>{item.tweets}</Text>
              </View>
            ))}

            {/* People to Follow */}
            <Text style={styles.sectionTitle}>Who to follow</Text>
            {peopleToFollow.map((person) => (
              <View key={person.id} style={styles.followItem}>
                <Image source={{ uri: person.avatar }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{person.name}</Text>
                  <Text style={styles.username}>@{person.username}</Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followText}>Follow</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        }
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    marginTop: 50,
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  categoryTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabButton: {
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 15,
    color: "#888",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  trendingItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  topic: {
    fontSize: 16,
    fontWeight: "600",
  },
  tweets: {
    fontSize: 13,
    color: "gray",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 16,
  },
  followItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  username: {
    fontSize: 13,
    color: "gray",
  },
  followButton: {
    backgroundColor: "#000",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  followText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
