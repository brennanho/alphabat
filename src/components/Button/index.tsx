import React, { useContext } from "react";
import { Pressable, StyleSheet, Image } from "react-native";
import { STYLES } from "@src/constants";
import { FONTS } from "@assets/index";
import AutoScaleText from "../AutoScaleText";
import { AppContext } from "@src/store";

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: "100%",
    ...STYLES.ELEVATION
  },
  text: {
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR_WHITE,
    fontSize: 64,
    padding: 12,
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});

const Button = ({
  onPress,
  disabled = false,
  children,
  withBackground = true,
  style = {},
  textStyles = {},
}) => {
  const { assets: { images }} = useContext(AppContext);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.button,
        ...style,
      }}
    >
      {withBackground && (
        <Image
          source={images.button.default}
          style={styles.background}
          resizeMode="stretch"
        />
      )}
      <AutoScaleText style={{ ...styles.text, ...textStyles }}>
        {children}
      </AutoScaleText>
    </Pressable>
  );
};

export default Button;
