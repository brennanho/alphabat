import React, { memo, useContext, useEffect, useState } from "react";
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
import LottieView from "lottie-react-native";
import { STYLES } from "@src/constants";
import { FONTS } from "@assets/index";
import AutoScaleText from "../AutoScaleText";
import { AppContext } from "@src/store";

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
  animationDelay,
  contestable,
}) => {
  const enterAnimationDuration = 500;
  const {
    assets: {
      animations: { letterTile },
    },
  } = useContext(AppContext);
  const enteringAnimation = SlideInDown.duration(enterAnimationDuration).delay(
    animationDelay
  );
  const exitingAnimation = FlipOutEasyX.duration(3000);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      onAnimationFinish();
    }, animationDelay + enterAnimationDuration);
  }, []);

  const handlePress = () => {
    onPress();
    setTransitioning(true);
  };

  let buttonAnimationProps;
  if (transitioning)
    buttonAnimationProps = {
      source: letterTile.transition,
      onAnimationFinish: (isCancelled) => {
        if (!isCancelled) setTransitioning(false);
      },
      autoPlay: true,
      loop: false,
    };
  else if (contestable)
    buttonAnimationProps = {
      source: letterTile.contestable,
      autoPlay: true,
      loop: true,
    };
  else
    buttonAnimationProps = {
      source: disabled ? letterTile.pressed : letterTile.unpressed,
      autoPlay: true,
      loop: true,
    };

  return (
    <Animated.View exiting={exitingAnimation} entering={enteringAnimation}>
      <Pressable
        onPressIn={handlePress}
        disabled={disabled}
        style={{
          ...styles.button,
          ...style,
        }}
      >
        <LottieView
          style={{
            ...styles.background,
            // display: disabled && !transitioning ? "none" : "flex",
          }}
          resizeMode="cover"
          {...buttonAnimationProps}
        ></LottieView>
        {/* {contestable && (
          <LottieView
            source={letterTile.radiate}
            style={styles.background}
            resizeMode="cover"
            loop
            autoPlay
          />
        )} */}
        <AutoScaleText
          style={{
            ...styles.text,
            display: disabled && !transitioning ? "none" : "flex",
          }}
        >
          {children}
        </AutoScaleText>
      </Pressable>
    </Animated.View>
  );
};

export default memo(LetterButton);
