import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Minor delay to ensure smooth navigation after login (fixes Samsung issues sometimes)
    setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 10);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/quad-logo.jpg')}
        style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 20 }}
      />
      <Text style={styles.brand}>QUAD</Text>
      <Text style={styles.subtitle}>Welcome back</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin} // <-- Wrapped in a function with delay
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.link}>No account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  brand: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1E1E1E',
    alignSelf: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: '#4A90E2',
    textAlign: 'center',
    fontSize: 14,
  },
});
