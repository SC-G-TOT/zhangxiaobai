import type { PropsWithChildren } from 'react';
import { ScrollViewProps, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedRef,
    useScrollViewOffset
} from 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<ScrollViewProps>;

export default function ThemedScrollView({
  children,
  ...props
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <Animated.ScrollView
        ref={scrollRef}
        {...props}>
        {children}
      </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
