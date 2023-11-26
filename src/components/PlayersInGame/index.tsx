import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  RotateOutDownRight,
  JumpingTransition,
} from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { STYLES } from "@src/constants";
import { FONTS } from "@assets/index";
import AutoScaleText from "../AutoScaleText";

const styles = StyleSheet.create({
  players: {
    width: "100%",
    paddingTop: 32,
    paddingBottom: 32,
    flex: 4,
    ...STYLES.ELEVATION,
  },
  player: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 4,
    padding: 4,
  },
  playerIcon: { height: "100%", width: "50%" },
  playerText: {
    fontSize: 40,
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR,
    width: "50%",
  },
  playerBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});

const PlayersInGame = ({ players, playerToAct }) => {
  return (
    <View style={styles.players}>
      {Object.values(players).map((player: any) => {
        return player.alive ? (
          <Animated.View
            style={styles.player}
            key={player.name}
            layout={JumpingTransition.duration(500)}
            exiting={RotateOutDownRight.duration(1000)}
          >
            <Animatable.Image
              style={styles.playerIcon}
              source={player.icon}
              resizeMode="contain"
              animation={playerToAct.name === player.name ? "tada" : ""}
              easing="ease-out"
              iterationCount="infinite"
            />
            <AutoScaleText style={styles.playerText}>
              {player.name}
            </AutoScaleText>
          </Animated.View>
        ) : null;
      })}
    </View>
  );
};

export default PlayersInGame;
