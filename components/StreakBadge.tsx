import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';

interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const fireScale = useSharedValue(1);

  useEffect(() => {
    // Entrance animation
    opacity.value = withDelay(300, withTiming(1, { duration: 400 }));
    scale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 120 }));

    // Pulse fire every 2s
    const interval = setInterval(() => {
      fireScale.value = withSequence(
        withTiming(1.3, { duration: 200 }),
        withTiming(1, { duration: 200 })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const fireStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fireScale.value }],
  }));

  return (
    <Animated.View style={[styles.badge, containerStyle]}>
      <Animated.Text style={[styles.fireEmoji, fireStyle]}>🔥</Animated.Text>
      <View style={styles.textContainer}>
        <Text style={styles.streakNumber}>{streak}</Text>
        <Text style={styles.streakLabel}>Day Streak</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.fire + '40',
    gap: Spacing.xs,
  },
  fireEmoji: {
    fontSize: 18,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  streakNumber: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.fire,
  },
  streakLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
