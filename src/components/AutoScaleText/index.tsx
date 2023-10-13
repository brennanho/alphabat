import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  autoScaleText: {
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
