import React from "react";
import { Pressable, StyleSheet, Text, Image } from "react-native";
import { STYLES } from "@src/constants";

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
  },
});

const LetterButton = ({
  onPress,
  disabled = false,
  children,
  style = {},
  fontSize = 32,
  backgroundImageSource,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.button,
        ...style,
        ...STYLES.ELEVATION,
      }}
    >
      <Image
        source={backgroundImageSource}
        style={styles.background}
        resizeMode="center"
      />
      <Text style={{ ...styles.text, fontSize }}>{children}</Text>
    </Pressable>
  );
};

export default LetterButton;
