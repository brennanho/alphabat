import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useContext,
  memo,
} from "react";
import { Platform, StyleSheet } from "react-native";
import { STYLES } from "@src/constants";
import LottieView from "lottie-react-native";
import { AppContext } from "@src/store";
import { Device } from "@src/types";

const styles = StyleSheet.create({
  timer: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    ...STYLES.ELEVATION,
  },
});

export const useTimer = () => {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  const [methods, setMethods] = useState({
    pause: () => null,
    resume: () => null,
    reset: () => null,
    play: () => null,
  });

  useEffect(() => {
    setMethods({
      pause: () => {
        ref.current.pause();
        setPaused(true);
      },
      resume: () => {
        ref.current.resume();
        setPaused(false);
      },
      reset: () => {
        if (Platform.OS === Device.Android) ref.current.play(0);
        else if (Platform.OS === Device.IOS) {
          ref.current.reset();
          ref.current.play();
        }
        setPaused(false);
      },
      play: () => {
        ref.current.play();
        setPaused(false);
      },
    });
  }, []);

  return { ...methods, paused, ref };
};

interface TimerProps {
  onTimerEnd: () => void;
  duration?: number;
  style: any;
}

const Timer = forwardRef(
  ({ duration = 15, style, onTimerEnd }: TimerProps, ref) => {
    const {
      assets: { animations },
    } = useContext(AppContext);

    const handleTimerEnd = (isCancelled: boolean) => {
      if (!isCancelled) {
        onTimerEnd();
      }
    };

    return (
      <LottieView
        ref={ref as any}
        onAnimationFinish={handleTimerEnd}
        source={animations.timer}
        duration={duration * 1000}
        style={{ ...styles.timer, ...style }}
        resizeMode="contain"
        loop={false}
      />
    );
  }
);

export default Timer;
