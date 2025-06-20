import { Button, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import ThemedScrollView from '@/components/ThemedScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

export default function DetailsScreen() {
    const router = useRouter();
    const [activeDate, setActiveDate] = useState<number>(0);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      >
      <ThemedScrollView horizontal contentContainerStyle={styles.dateContainer}>
        {
         Array.from({length: 10}).map((_, index) => (
            <ThemedView key={index} style={styles.stepContainer} onTouchEnd={(value) => {
                console.log('pressed', value.target);
            }}>
                <ThemedText type="subtitle">今天</ThemedText>
                <ThemedText type="subtitle">Step {index + 1}</ThemedText>
            </ThemedView>
         ))
        }
      </ThemedScrollView>
      <Link href="/details/recog">
        Go to Recog screen
      </Link>
      <Button title="Recog" onPress={() => {
        router.push('/details/aaa');
      }} />
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

