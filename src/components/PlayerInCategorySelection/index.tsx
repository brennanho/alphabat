import { AppContext } from "@src/store";
import React from "react";
import { useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
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
    gap: 8,
    height: "10%"
  },
  livesIcon: {
    bottom: 0,
    left: 0,
    width: 64,
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
    assets: { images },
  } = useContext(AppContext);
  const livesIconMap = {
    "1": images.lives.one,
    "2": images.lives.two,
    "3": images.lives.three,
  };
  return (
    <View style={{ ...styles.player, ...style }}>
      <Image
        source={player.icon}
        style={styles.playerIcon}
        resizeMode="contain"
      />
      <View style={styles.playerName}>
        <Image
          source={livesIconMap[player.lives]}
          style={styles.livesIcon}
          resizeMode="contain"
        />
        <AutoScaleText style={{ ...styles.playerText }} lines={3}>
          {player.name}
        </AutoScaleText>
      </View>
    </View>
  );
};

export default PlayerInCategorySelection;
