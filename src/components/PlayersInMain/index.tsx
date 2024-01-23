import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { AutoScaleText, Button } from "@src/components";
import { Player } from "@src/types";
import { STYLES } from "@src/constants";
import Animated, {
  JumpingTransition,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";
import { FONTS } from "@assets/index";

const styles = StyleSheet.create({
  playersInMain: {
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
  },
  playerTextAndCancelButtonWrapper: {
    flex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  playerIcon: { height: "100%", flex: 1, flexGrow: 1, alignSelf: "flex-start" },
  playerText: {
    fontSize: 40,
    paddingLeft: 8,
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR_WHITE,
    flex: 2,
  },
  cancelButton: {
    height: 40,
  },
  background: { position: "absolute", width: "100%", height: "100%" },
});

interface PlayersListProps {
  players: Map<string, Player>;
  onRemovePlayer: (playerName: string) => void;
}

const PlayersInMain = ({
  players,
  onRemovePlayer = (playerName) => null,
}: PlayersListProps) => {
  return (
    <View style={styles.playersInMain}>
      {Array.from(players).map(([, player]) => {
        const handlePress = () => onRemovePlayer(player.name);
        return (
          <Animated.View
            style={styles.player}
            key={player.name}
            layout={JumpingTransition.duration(500)}
            entering={SlideInRight.duration(500)}
            exiting={SlideOutRight.duration(500)}
          >
            <Image
              style={styles.playerIcon}
              source={player.icon}
              resizeMode="contain"
            />
            <View style={styles.playerTextAndCancelButtonWrapper}>
              <AutoScaleText style={styles.playerText}>
                {player.name}
              </AutoScaleText>
              <Button
                style={styles.cancelButton}
                onPress={handlePress}
                withBackground={false}
              >
                ✕
              </Button>
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default PlayersInMain;
