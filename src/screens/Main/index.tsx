import { Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { Page, PlayerInput, PlayersList, Button } from "@src/components";
import { AppContext } from "@src/store";
import { Player } from "@src/types";
import { SCREENS } from "@src/constants";

const styles = StyleSheet.create({
  header: {
    fontSize: 64,
  },
});

const Main = ({ navigation }) => {
  const { players, addPlayer, removePlayer } = useContext(AppContext);
  const playerNames = Object.values(players).map(
    (player: Player) => player.name
  );
  const startGameDisabled = playerNames.length <= 1;

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
      <Text style={styles.header}>Alphabattle</Text>
      <PlayersList
        players={playerNames}
        onRemovePlayer={handleRemovePlayer}
        withRemoveButton
        style={{ height: "50%" }}
      />
      <PlayerInput onAddPlayer={handleAddPlayer} />
      <Button
        onPress={handleNavigation}
        text="START GAME"
        disabled={startGameDisabled}
      />
    </Page>
  );
};

export default Main;
