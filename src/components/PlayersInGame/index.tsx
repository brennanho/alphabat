import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  RotateInDownRight,
  RotateOutDownRight,
  BounceIn,
  JumpingTransition,
} from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { STYLES } from "@src/constants";
import { FONTS } from "@assets/index";

const styles = StyleSheet.create({
  players: {
    width: "100%",
    paddingTop: 32,
    paddingBottom: 32,
    flex: 1,
    ...STYLES.ELEVATION,
  },
  player: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 4,
  },
  playerIcon: { height: "100%", width: "40%" },
  playerText: { fontSize: 16, fontFamily: FONTS.REGULAR.NAME },
});

const PlayersInGame = ({ players, playerToAct }) => {
  return (
    <Animated.View
      layout={JumpingTransition.duration(1000)}
      style={styles.players}
    >
      {Object.values(players).map((player: any) => {
        return player.alive ? (
          <Animated.View
            style={styles.player}
            key={player.name}
            layout={JumpingTransition.duration(1000)}
            entering={BounceIn.duration(1000)}
            exiting={RotateOutDownRight.duration(1000)}
          >
            <Animatable.Image
              style={styles.playerIcon}
              source={player.icon}
              resizeMode="contain"
              animation={playerToAct.name === player.name ? "pulse" : ""}
              easing="ease-out"
              iterationCount="infinite"
            />
            <Text style={styles.playerText}>{player.name}</Text>
          </Animated.View>
        ) : null;
      })}
    </Animated.View>
  );
};

export default PlayersInGame;
