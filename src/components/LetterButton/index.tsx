import React, { memo, useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  BounceIn,
  BounceOut,
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";
import { STYLES } from "@src/constants";
import { FONTS } from "@assets/index";

const styles = StyleSheet.create({
  button: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "transparent",
  },
  background: {
    top: 0,
    left: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
    fontFamily: FONTS.BOLD.NAME
  },
});

const LetterButton = ({
  onPress,
  disabled = false,
  children,
  style = {},
  fontSize = 36,
  backgroundImageSource,
}) => {
  const opacity = useSharedValue(1);

  const handlePress = () => {
    opacity.value = withSequence(
      withTiming(0, {
        duration: 50,
        easing: Easing.out(Easing.ease),
      }),
      withTiming(1, {
        duration: 500,
        easing: Easing.in(Easing.ease),
      })
    );
    onPress();
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [backgroundImageSource]);

  return (
    <Pressable
      onPressIn={handlePress}
      disabled={disabled}
      style={{
        ...styles.button,
        ...style,
        ...STYLES.ELEVATION,
      }}
    >
      <Animated.Image
        source={backgroundImageSource}
        style={[styles.background, animatedStyles]}
        resizeMode="center"
        exiting={BounceOut}
        entering={BounceIn}
      />
      <Text style={{ ...styles.text, fontSize }}>{children}</Text>
    </Pressable>
  );
};

export default memo(LetterButton);
