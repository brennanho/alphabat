import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import {
  Page,
  PlayerInput,
  PlayersInMain,
  Button,
  AutoScaleText,
} from "@src/components";
import { AppContext } from "@src/store";
import { SCREENS, STYLES } from "@src/constants";
import { FONTS } from "@assets/index";

const styles = StyleSheet.create({
  header: {
    fontSize: 128,
    fontFamily: FONTS.BOLD.NAME,
    color: STYLES.TEXT_COLOR,
    padding: 16,
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    height: "75%",
    width: "80%",
    gap: 20,
  },
  playerInput: {
    height: "10%",
  },
  startGame: {
    height: "15%",
  },
});

const Main = ({ navigation }) => {
  const { players, addPlayer, removePlayer } = useContext(AppContext);
  const startGameDisabled = players.size <= 1;

  const handleAddPlayer = (playerName: string) => {
    addPlayer(playerName);
  };

  const handleRemovePlayer = (playerName: string) => {
    removePlayer(playerName);
  };

  const handleNavigation = () => {
    navigation.navigate(SCREENS.CATEGORY_SELECTION);
  };

  return (
    <>
      <Page>
        <AutoScaleText style={styles.header}>ARRPHABET</AutoScaleText>
        <View style={styles.menu}>
          <PlayersInMain
            players={players}
            onRemovePlayer={handleRemovePlayer}
          />
          <PlayerInput
            style={styles.playerInput}
            onAddPlayer={handleAddPlayer}
          />
          <Button
            style={styles.startGame}
            disabled={startGameDisabled}
            onPress={handleNavigation}
          >
            PLAY
          </Button>
        </View>
      </Page>
    </>
  );
};

export default Main;
