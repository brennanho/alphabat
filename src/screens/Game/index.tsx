import { View, StyleSheet, FlatList, Text } from "react-native";
import { Page, Board, PlayersList } from "@src/components";
import { useState, useContext } from "react";
import { INITIAL_GAME_STATE } from "./constants";
import { AppContext } from "@src/store";
import { Player } from "@src/types";

const styles = StyleSheet.create({
  category: {
    fontSize: 32,
    marginBottom: 64,
  },
});

const Game = ({
  route: {
    params: { category },
  },
}) => {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const { players } = useContext(AppContext);
  const playerNames = Object.values(players).map(
    (player: Player) => player.name
  );

  const handleLetterTilePressed = (letter: string) => {
    setGameState((prevState) => ({
      ...prevState,
      tiles: {
        ...prevState.tiles,
        [letter]: { pressed: true },
      },
      contestableLetter: letter,
    }));
  };

  return (
    <Page>
      <Text style={styles.category}>{category}</Text>
      <PlayersList players={playerNames} style={{ height: "25%" }} />
      <Text>{gameState.contestableLetter}</Text>
      <Board
        tiles={gameState.tiles}
        onTilePressed={handleLetterTilePressed}
        contestableLetter={gameState.contestableLetter}
      />
    </Page>
  );
};

export default Game;
