import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const TweetCreationScreen = () => {
  const router = useRouter();
  const [tweetText, setTweetText] = useState('');
  const [media, setMedia] = useState<{ uri: string, type: 'image' | 'video' }[]>([]);

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type === 'video' ? 'video' : 'image',
      }));
      setMedia([...media, ...selected]);
    }
  };

  const removeMedia = (index: number) => {
    const updated = [...media];
    updated.splice(index, 1);
    setMedia(updated);
  };

  const handleTweet = () => {
    if (!tweetText.trim() && media.length === 0) {
      Alert.alert("Tweet is empty", "Please add text or media.");
      return;
    }

    // TODO: Connect to backend
    Alert.alert("Tweet posted!", "This is where backend submission will go.");
    setTweetText('');
    setMedia([]);
    router.back(); // Go back to Home after tweet
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Tweet</Text>
      </View>

      {/* Tweet Input */}
      <TextInput
        placeholder="What's happening?"
        multiline
        value={tweetText}
        onChangeText={setTweetText}
        style={styles.input}
        textAlignVertical="top"
      />

      {/* Media Preview */}
      <View style={styles.mediaContainer}>
        {media.map((item, index) => (
          <View key={index} style={styles.preview}>
            <TouchableOpacity onPress={() => removeMedia(index)} style={styles.removeButton}>
              <Ionicons name="close-circle" size={20} color="red" />
            </TouchableOpacity>
            {item.type === 'image' ? (
              <Image source={{ uri: item.uri }} style={styles.media} />
            ) : (
              <Video
                source={{ uri: item.uri }}
                style={styles.media}
                useNativeControls
                resizeMode="cover"
              />
            )}
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity onPress={pickMedia} style={styles.button}>
          <Ionicons name="image" size={20} color="white" />
          <Text style={styles.buttonText}>Media</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/voice-recorder')}
          style={styles.button}
        >
          <Ionicons name="mic" size={20} color="white" />
          <Text style={styles.buttonText}>Voice</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTweet} style={styles.tweetButton}>
          <Text style={styles.tweetButtonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TweetCreationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  input: {
    fontSize: 18,
    minHeight: 100,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f2f5',
    borderRadius: 10,
  },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  preview: {
    position: 'relative',
    margin: 5,
  },
  media: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'white',
    borderRadius: 10,
    zIndex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1da1f2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
  tweetButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  tweetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
