import { FONTS } from "@assets/index";
import { STYLES } from "@src/constants";
import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  autoScaleText: {
    color: STYLES.TEXT_COLOR_WHITE,
    fontFamily: FONTS.REGULAR.NAME,
    fontSize: 32,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 1,
  },
});

const AutoScaleText = ({ lines = 1, children, style = {} }) => {
  return (
    <Text
      style={{
        ...styles.autoScaleText,
        ...style,
      }}
      adjustsFontSizeToFit
      numberOfLines={lines}
    >
      {children}
    </Text>
  );
};

export default AutoScaleText;
