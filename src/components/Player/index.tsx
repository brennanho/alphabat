import { FONTS } from "@assets/index";
import { SCORE_TO_WIN, STYLES } from "@src/constants";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as Progress from 'react-native-progress';
import AutoScaleText from "../AutoScaleText";

const styles = StyleSheet.create({
  player: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    ...STYLES.ELEVATION
  },
  playerIcon: { width: "100%", height: "50%" },
  playerText: { fontSize: 32, fontFamily: FONTS.BOLD.NAME, color: STYLES.TEXT_COLOR, marginBottom: 8 },
});

const Player = ({ player, style = {}, textStyle = {} }) => {
  return (
    <View style={{ ...styles.player, ...style }}>
      <Image
        source={player.icon}
        style={styles.playerIcon}
        resizeMode="contain"
      />
      <AutoScaleText style={{...styles.playerText, ...textStyle}}>{player.name}</AutoScaleText>
      <Progress.Bar progress={player.score / SCORE_TO_WIN} width={200} height={50} animated color="orange" />
    </View>
  );
};

export default Player;
