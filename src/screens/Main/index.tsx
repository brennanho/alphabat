import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Page, PlayerInput, PlayersInMain, Button } from "@src/components";
import { AppContext } from "@src/store";
import { SCREENS } from "@src/constants";
import { FONTS } from "@assets/index";

const styles = StyleSheet.create({
  header: {
    fontSize: 64,
    fontFamily: FONTS.REGULAR.NAME,
    marginBottom: 32,
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    height: "75%",
    width: "75%",
    gap: 16,
  },
  playerInput: {
    height: 64,
  },
  startGame: {
    height: 64,
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
        <Text style={styles.header}>ARRPHABET</Text>
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
            START GAME
          </Button>
        </View>
      </Page>
    </>
  );
};

export default Main;
