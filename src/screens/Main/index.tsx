import { Text, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { Page, PlayerInput, PlayersList, Button } from "@src/components";
import { AppContext } from "@src/store";
import { Player } from "@src/types";
import { SCREENS } from "@src/constants";

const styles = StyleSheet.create({
  header: {
    fontSize: 64,
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    marginTop: 64,
    gap: 16,
  },
  players: {
    height: 300,
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
  const startGameDisabled = Object.keys(players).length <= 1;

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
    <Page>
      <Text style={styles.header}>Arrrphabet</Text>
      <View style={styles.menu}>
        <PlayersList
          players={players}
          onRemovePlayer={handleRemovePlayer}
          style={styles.players}
        />
        <PlayerInput style={styles.playerInput} onAddPlayer={handleAddPlayer} />
        <Button
          style={styles.startGame}
          disabled={startGameDisabled}
          onPress={handleNavigation}
        >
          START GAME
        </Button>
      </View>
    </Page>
  );
};

export default Main;
