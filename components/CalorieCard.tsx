import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CalorieCardProps {
  consumed: number;
  target: number;
  burned?: number;
}

const SIZE = 200;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CalorieCard({ consumed, target, burned = 0 }: CalorieCardProps) {
  const remaining = Math.max(target - consumed + burned, 0);
  const progress = useSharedValue(0);

  useEffect(() => {
    const ratio = Math.min(consumed / target, 1);
    progress.value = withDelay(
      200,
      withTiming(ratio, {
        duration: 1400,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [consumed, target]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  const isOverTarget = consumed > target;

  return (
    <View style={styles.wrapper}>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <LinearGradient id="calGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={isOverTarget ? '#FF6B6B' : '#00FF87'} />
            <Stop offset="100%" stopColor={isOverTarget ? '#FF3B30' : '#00C9FF'} />
          </LinearGradient>
        </Defs>
        {/* Background track */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={Colors.surfaceAlt}
          strokeWidth={STROKE}
          fill="none"
        />
        {/* Progress arc */}
        <AnimatedCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="url(#calGrad)"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>

      {/* Center content */}
      <View style={styles.center}>
        <Text style={styles.remainingLabel}>
          {isOverTarget ? 'Over by' : 'Remaining'}
        </Text>
        <Text style={[styles.remainingValue, isOverTarget && styles.overValue]}>
          {isOverTarget ? consumed - target : remaining}
        </Text>
        <Text style={styles.kcal}>kcal</Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <StatItem label="Eaten" value={consumed} color={Colors.primary} />
        <View style={styles.divider} />
        <StatItem label="Goal" value={target} color={Colors.textSecondary} />
        <View style={styles.divider} />
        <StatItem label="Burned" value={burned} color={Colors.secondary} />
      </View>
    </View>
  );
}

function StatItem({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: Spacing.lg,
  },
  center: {
    position: 'absolute',
    top: 0,
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  remainingLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  remainingValue: {
    fontSize: FontSize['4xl'],
    color: Colors.textPrimary,
    fontWeight: '800',
    letterSpacing: -1,
  },
  overValue: {
    color: '#FF6B6B',
  },
  kcal: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: Spacing.xl,
    width: SIZE + 40,
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '500',
  },
});
