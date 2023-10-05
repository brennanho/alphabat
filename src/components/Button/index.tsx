import React from 'react';
import { Pressable, StyleSheet, Text } from "react-native";
import { STYLES } from "@src/constants";

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
});

const Button = ({
  onPress,
  disabled = false,
  children,
  style = {},
  fontSize = 32,
  elevation = true,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.button,
        ...style,
        ...(elevation ? STYLES.ELEVATION : {}),
      }}
    >
      <Text style={{ fontSize }}>{children}</Text>
    </Pressable>
  );
};

export default Button;
