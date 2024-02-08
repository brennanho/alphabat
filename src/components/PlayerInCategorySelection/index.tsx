import { AppContext } from "@src/store";
import React from "react";
import { useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import AutoScaleText from "../AutoScaleText";
import { FONTS } from "@assets/index";
import { STYLES } from "@src/constants";

const styles = StyleSheet.create({
  player: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    ...STYLES.ELEVATION,
  },
  playerIcon: { height: "75%", width: "100%" },
  playerName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: "10%",
  },
  livesIcon: {
    width: undefined,
    height: "100%",
    aspectRatio: 1,
  },
  playerText: {
    fontSize: 32,
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR,
    ...STYLES.ELEVATION,
  },
});

const PlayerInCategorySelection = ({ player, style = {} }) => {
  const {
    assets: { animations },
  } = useContext(AppContext);
  const livesIconMap = {
    "0": animations.character.life1,
    "1": animations.character.life1,
    "2": animations.character.life2,
    "3": animations.character.life3,
  };
  return (
    <View style={{ ...styles.player, ...style }}>
      <Image source={player.icon} style={styles.playerIcon} resizeMode="contain" />
      <View style={styles.playerName}>
        <LottieView source={livesIconMap[player.lives]} style={styles.livesIcon} resizeMode="contain" autoPlay />
        <AutoScaleText style={styles.playerText} lines={3}>
          {player.name}
        </AutoScaleText>
      </View>
    </View>
  );
};

export default PlayerInCategorySelection;
