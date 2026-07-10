import React, {useRef} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

interface BoxProps extends ViewProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];

  row?: boolean;
  flex?: number;
  justify?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];

  padding?: number;
  margin?: number;

  backgroundColor?: string;
  radius?: number;

  width?: ViewStyle['width'];
  height?: ViewStyle['height'];

  pressable?: boolean;

  onPress?: () => void;
}

export default function Box({
  children,
  style,

  row = false,
  flex,
  justify,
  align,
  padding,
  margin,
  backgroundColor,
  radius,
  width,
  height,

  pressable = false,
  onPress,

  ...rest
}: BoxProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const contentStyle = [
    styles.base,
    {
      flexDirection: row ? 'row' : 'column',
      flex,
      justifyContent: justify,
      alignItems: align,
      padding,
      margin,
      backgroundColor,
      borderRadius: radius,
      width,
      height,
    },
    style,
  ];

  if (!pressable) {
    return (
      <View style={contentStyle} {...rest}>
        {children}
      </View>
    );
  }

  return (
    <Animated.View style={{transform: [{scale}]}}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          Animated.spring(scale, {
            toValue: 0.94,
            useNativeDriver: true,
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(scale, {
            toValue: 1,
            damping: 6,
            stiffness: 250,
            useNativeDriver: true,
          }).start();
        }}
        style={contentStyle}>
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    maxWidth: '100%',
  },
});