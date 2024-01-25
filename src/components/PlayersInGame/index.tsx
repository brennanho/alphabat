import React, { useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import Animated, {
  RotateOutDownRight,
  JumpingTransition,
} from "react-native-reanimated";
import { STYLES } from "@src/constants";
import { AppContext } from "@src/store";
import { PlayerInGame } from "@src/components";

const styles = StyleSheet.create({
  players: {
    width: "100%",
    height: "100%",
    paddingTop: 32,
    paddingBottom: 32,
    gap: 12,
    ...STYLES.ELEVATION,
  },
  player: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

const PlayersInGame = ({ players, playerToAct }) => {
  const {
    assets: { images },
  } = useContext(AppContext);
  const livePlayersCount = players.filter((player) => player.alive).length;

  return (
    <View style={styles.players}>
      {Object.values(players).map((player: any) => {
        const gePlayerLiveIconStyles = () => {
          if (livePlayersCount >= 6) return { right: 12, bottom: 0 };
          else if (livePlayersCount == 5) return { right: 8, bottom: 0 };
          else if (livePlayersCount == 4) return { right: 0, bottom: 0 };
          else if (livePlayersCount === 3) return { right: 0, bottom: 8 };
          else if (livePlayersCount === 2) return { right: 0, bottom: 28 };
          else return { right: 0, bottom: 90 };
        };

        return player.alive ? (
          <Animated.View
            key={player.name}
            style={styles.player}
            layout={JumpingTransition.duration(500)}
            exiting={RotateOutDownRight.duration(1000)}
          >
            <PlayerInGame
              player={player}
              isTurn={playerToAct.name === player.name}
              liveIconStyle={gePlayerLiveIconStyles()}
            />
          </Animated.View>
        ) : null;
      })}
    </View>
  );
};

export default PlayersInGame;
