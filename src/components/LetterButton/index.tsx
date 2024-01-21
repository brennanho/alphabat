import React, { memo, useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Image, Platform } from "react-native";
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
import { Device } from "@src/types";

const styles = StyleSheet.create({
  buttonWrapper: {
    position: "relative",
    height: "100%",
    backgroundColor: "transparent",
    flex: 1,
    ...STYLES.ELEVATION,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
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
    fontSize: 48,
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
  const [androidStartedAnimation, setAndroidStartedAnimation] = useState(false);

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
  if (transitioning) {
    buttonAnimationProps = {
      source: letterTile.transition,
      onAnimationFinish: (isCancelled: boolean) => {
        if (!isCancelled) {
          if (Platform.OS === Device.IOS) setTransitioning(false);
          // Android specific issue where onAnimationFinish triggers immediately when rendered
          else if (Platform.OS === Device.Android) {
            if (androidStartedAnimation) {
              setTransitioning(false);
              setAndroidStartedAnimation(false);
            } else setAndroidStartedAnimation(true);
          }
        }
      },
      autoPlay: true,
      loop: false,
    };
  } else if (contestable)
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
    <Animated.View
      style={{ ...styles.buttonWrapper, ...style }}
      exiting={exitingAnimation}
      entering={enteringAnimation}
    >
      <Pressable
        onPressIn={handlePress}
        disabled={disabled}
        style={styles.button}
      >
        <LottieView
          style={{
            ...styles.background,
          }}
          resizeMode="contain"
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
