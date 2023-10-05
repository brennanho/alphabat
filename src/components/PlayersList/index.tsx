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
import { IMAGES } from "@assets/index";

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    minHeight: 480,
    top: 0,
    left: 0,
    zIndex: 0,
  },
  playersListScrollContainer: { position: "relative" },
  playersList: { padding: 64, gap: 8, paddingLeft: 32 },
  player: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    ...STYLES.ELEVATION,
  },
  playerIcon: {
    width: "30%",
    height: "100%",
  },
  playerText: {
    fontSize: 16,
  },
  cancelButton: {
    height: 32,
    backgroundColor: "transparent",
    marginLeft: "auto",
  },
});

interface PlayersListProps {
  players: Map<string, Player>;
  onRemovePlayer: (playerName: string) => void;
  style: Object;
}

const PlayersList = ({
  players,
  onRemovePlayer = (playerName) => null,
  style = {},
}: PlayersListProps) => {
  return (
    <ScrollView style={{ ...style, ...styles.playersListScrollContainer }}>
      <ImageBackground
        source={IMAGES.BACKGROUND.CHARACTERS}
        style={styles.background}
        resizeMode="stretch"
      />
      <View style={styles.playersList}>
        {Array.from(players).map(([, player]) => {
          const handlePress = () => onRemovePlayer(player.name);
          return (
            <View style={styles.player} key={player.name}>
              <Image
                source={player.icon}
                style={styles.playerIcon}
                resizeMode="contain"
              />
              <Text style={styles.playerText}>{player.name}</Text>
              <Button
                style={styles.cancelButton}
                onPress={handlePress}
                fontSize={16}
              >
                ✕
              </Button>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default PlayersList;
