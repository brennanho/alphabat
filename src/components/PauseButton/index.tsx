import React, { memo, useEffect } from "react";
import { Pressable, StyleSheet, Image } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withSequence,
  FlipOutEasyX,
  SlideInDown,
} from "react-native-reanimated";
import { STYLES } from "@src/constants";
import { FONTS } from "@assets/index";
import AutoScaleText from "../AutoScaleText";

const styles = StyleSheet.create({
  button: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "transparent",
    ...STYLES.ELEVATION,
  },
  background: {
    top: 0,
    left: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: FONTS.REGULAR.NAME,
    color: "white",
    fontSize: 128,
    padding: 12,
  },
});

const LetterButton = ({
  onPress,
  onAnimationFinish,
  disabled = false,
  children,
  style = {},
  backgroundImageSource,
  animationDelay,
}) => {
  const enterAnimationDuration = 500;
  const opacity = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [backgroundImageSource]);
  const enteringAnimation = SlideInDown.duration(enterAnimationDuration).delay(
    animationDelay
  );
  const exitingAnimation = FlipOutEasyX.duration(3000);

  useEffect(() => {
    setTimeout(() => {
      onAnimationFinish();
    }, animationDelay + enterAnimationDuration);
  }, []);

  const handlePress = () => {
    opacity.value = withSequence(
      withTiming(0, {
        duration: 100,
        easing: Easing.out(Easing.ease),
      }),
      withTiming(1, {
        duration: 100,
        easing: Easing.in(Easing.ease),
      })
    );
    onPress();
  };

  return (
    <Animated.View
      style={animatedStyles}
      exiting={exitingAnimation}
      entering={enteringAnimation}
    >
      <Pressable
        onPressIn={handlePress}
        disabled={disabled}
        style={{
          ...styles.button,
          ...style,
        }}
      >
        <Image
          source={backgroundImageSource}
          style={styles.background}
          resizeMode="stretch"
        />
        <AutoScaleText style={styles.text}>{children}</AutoScaleText>
      </Pressable>
    </Animated.View>
  );
};

export default memo(LetterButton);
