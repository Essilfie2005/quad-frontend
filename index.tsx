import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Defer the navigation until after the first render frame
    setTimeout(() => {
      router.replace('/login'); // Updated path
    }, 0);
  }, []);

  return <View />;
}