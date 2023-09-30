import { View, StyleSheet, FlatList, Text } from "react-native";
import { Page, Board } from "@src/components";
import { useState } from "react";
import { INITIAL_GAME_STATE } from "./constants";

const styles = StyleSheet.create({});

const Game = () => {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

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
