import { Audio } from "expo-av";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VoiceRecorderScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioURI, setAudioURI] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const startRecording = async () => {
    try {
      setIsLoading(true);
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow audio recording");
        setIsLoading(false);
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await rec.startAsync();

      setRecording(rec);
    } catch (err) {
      Alert.alert("Error", "Could not start recording");
    } finally {
      setIsLoading(false);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setIsLoading(true);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioURI(uri);
      setRecording(null);
    } catch (err) {
      Alert.alert("Error", "Failed to stop recording");
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = async () => {
    if (!audioURI) {
      Alert.alert("No recording", "Record something first");
      return;
    }

    try {
      // Unload previous sound if any
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // Set playback audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
      });

      const { sound } = await Audio.Sound.createAsync({ uri: audioURI });
      soundRef.current = sound;

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying && status.didJustFinish) {
          sound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (err) {
      Alert.alert("Playback Error", "Could not play audio");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Recorder</Text>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {!recording ? (
        <TouchableOpacity style={styles.button} onPress={startRecording} disabled={isLoading}>
          <Text style={styles.buttonText}>Start Recording</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopRecording} disabled={isLoading}>
          <Text style={styles.buttonText}>Stop Recording</Text>
        </TouchableOpacity>
      )}

      {audioURI && (
        <TouchableOpacity style={styles.button} onPress={playAudio}>
          <Text style={styles.buttonText}>Play Audio</Text>
        </TouchableOpacity>
      )}

      {audioURI && <Text style={styles.uriText}>Recorded URI: {audioURI.split("/").pop()}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 30 },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
  },
  stopButton: { backgroundColor: "#d9534f" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  uriText: { marginTop: 20, fontSize: 12, color: "gray", textAlign: "center" },
});