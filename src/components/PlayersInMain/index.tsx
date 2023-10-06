import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { Button } from "@src/components";
import { Player } from "@src/types";
import { STYLES } from "@src/constants";
import Animated, {
  JumpingTransition,
  RotateInDownRight,
  RotateOutDownRight,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  players: {
    width: "100%",
    flex: 1,
    ...STYLES.ELEVATION,
  },
  player: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingRight: 24,
  },
  playerTextAndCancelButtonWrapper: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playerIcon: { height: "100%", flex: 1, flexGrow: 2, alignSelf: "flex-start" },
  playerText: { fontSize: 16 },
  cancelButton: {
    height: 32,
    backgroundColor: "transparent",
  },
});

interface PlayersListProps {
  players: Map<string, Player>;
  onRemovePlayer: (playerName: string) => void;
  style: Object;
}

const PlayersInMain = ({
  players,
  onRemovePlayer = (playerName) => null,
}: PlayersListProps) => {
  return (
    <Animated.View
      layout={JumpingTransition.duration(1000)}
      style={styles.players}
    >
      {Array.from(players).map(([, player]) => {
        const handlePress = () => onRemovePlayer(player.name);
        console.log(player);
        return (
          <Animated.View
            style={styles.player}
            key={player.name}
            layout={JumpingTransition.duration(1000)}
            entering={RotateInDownRight.duration(1000)}
            exiting={RotateOutDownRight.duration(1000)}
          >
            <Image
              style={styles.playerIcon}
              source={player.icon}
              resizeMode="contain"
            />
            <View style={styles.playerTextAndCancelButtonWrapper}>
              <Text style={styles.playerText}>{player.name}</Text>
              <Button
                style={styles.cancelButton}
                onPress={handlePress}
                fontSize={16}
              >
                ✕
              </Button>
            </View>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

export default PlayersInMain;
