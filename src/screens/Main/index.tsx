import React, { useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Page, PlayerInput, PlayersInMain, Button } from "@src/components";
import { AppContext } from "@src/store";
import { SCREENS, STYLES } from "@src/constants";

const styles = StyleSheet.create({
  title: { width: "95%", ...STYLES.ELEVATION },
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
  const { players, addPlayer, removePlayer, assets } = useContext(AppContext);
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
        <Image
          source={assets.images.title}
          resizeMode="contain"
          style={styles.title}
        />
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
