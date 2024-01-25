import { AppContext } from "@src/store";
import React from "react";
import { useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import AutoScaleText from "../AutoScaleText";
import { FONTS } from "@assets/index";
import { STYLES } from "@src/constants";

const styles = StyleSheet.create({
  player: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    gap: 8,
    ...STYLES.ELEVATION,
  },
  iconsWrapper: {
    height: "100%",
    width: "40%",
    position: "relative",
  },
  playerIcon: {
    height: "100%",
    width: "100%",
  },
  livesIcon: {
    position: "absolute",
    width: "25%",
    height: "25%",
    right: 0,
    bottom: 8,
  },
  playerText: {
    fontSize: 32,
    width: "50%",
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR,
    ...STYLES.ELEVATION,
  },
});

const PlayerInGame = ({ player, isTurn, style = {}, liveIconStyle = {} }) => {
  const {
    assets: { images },
  } = useContext(AppContext);

  const livesIconMap = {
    "0": images.lives.zero,
    "1": images.lives.one,
    "2": images.lives.two,
    "3": images.lives.three,
  };

  return (
    <View style={{ ...styles.player, ...style }}>
      <View style={styles.iconsWrapper}>
        <Animatable.Image
          style={styles.playerIcon}
          source={player.icon}
          resizeMode="contain"
          animation={isTurn ? "tada" : ""}
          easing="ease-out"
          iterationCount="infinite"
        />
        <Animatable.Image
          source={livesIconMap[player.lives]}
          style={{ ...styles.livesIcon, ...liveIconStyle }}
          resizeMode="contain"
          animation={isTurn ? "tada" : ""}
          easing="ease-out"
          iterationCount="infinite"
        />
      </View>
      <AutoScaleText style={styles.playerText}>{player.name}</AutoScaleText>
    </View>
  );
};

export default PlayerInGame;
