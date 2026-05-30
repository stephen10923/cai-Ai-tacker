import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors, FontSize } from '../constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface MacroRingProps {
  label: string;
  value: number;
  target: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  unit?: string;
}

export default function MacroRing({
  label,
  value,
  target,
  color,
  size = 80,
  strokeWidth = 7,
  unit = 'g',
}: MacroRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(0);

  useEffect(() => {
    const ratio = Math.min(value / target, 1);
    progress.value = withTiming(ratio, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [value, target]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  const pct = Math.round((value / target) * 100);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color + '22'}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={[styles.value, { color }]}>{value}{unit}</Text>
        <Text style={styles.target}>/{target}{unit}</Text>
      </View>
      <Text style={[styles.label, { color }]}>{label}</Text>
      <Text style={styles.pct}>{pct}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 4,
  },
  svg: {
    position: 'relative',
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  target: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  pct: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '500',
  },
});
