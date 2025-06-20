import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function AAAScreen() {
    const router = useRouter();
    const [activeDate, setActiveDate] = useState<number>(0);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      >
<ThemedText>我是</ThemedText>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
    dateContainer: {
        gap: 8,
    },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

