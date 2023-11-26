import { FONTS } from "@assets/index";
import { SCORE_TO_WIN, STYLES } from "@src/constants";
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import AutoScaleText from "../AutoScaleText";

const styles = StyleSheet.create({
  player: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    ...STYLES.ELEVATION,
  },
  playerIcon: { width: "100%", height: "50%" },
  playerText: {
    fontSize: 32,
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR,
    marginBottom: 12,
  },
});

const Player = ({ player, style = {}, textStyle = {} }) => {
  return (
    <View style={{ ...styles.player, ...style }}>
      <Image
        source={player.icon}
        style={styles.playerIcon}
        resizeMode="contain"
      />
      <AutoScaleText style={{ ...styles.playerText, ...textStyle }} lines={3}>
        {player.name}
      </AutoScaleText>
      <Progress.Bar
        progress={player.score / SCORE_TO_WIN}
        width={250}
        height={50}
        animated
        color="orange"
      />
    </View>
  );
};

export default Player;
