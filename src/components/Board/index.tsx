import React, { useId, useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { LetterButton } from "@src/components";
import { BOARD } from "./constants";
import { IMAGES } from "@assets/index";

const styles = StyleSheet.create({
  board: {
    position: "absolute",
    padding: 8,
    zIndex: -1,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "auto",
  },
  row: {
    height: "10%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tile: {
    minWidth: "17.5%",
    height: "100%",
  },
});

const Board = ({ tiles, contestableLetter, onTilePressed, style = {} }) => {
  const id = useId();

  return (
    <View style={{ ...styles.board, ...style }}>
      {BOARD.map((row, rowIdx) => {
        return (
          <View key={`${id}-${rowIdx}`} style={styles.row}>
            {row.map((letter, letterIdx) => {
              const handleLetterPressed = () => {
                onTilePressed(letter);
              };

              const getTileBackgroundImageSource = () => {
                const { pressed } = tiles[letter];
                if (!pressed) return IMAGES.LETTER_BLOCK.DEFAULT;
                return letter === contestableLetter
                  ? IMAGES.LETTER_BLOCK.CONTESTABLE
                  : IMAGES.LETTER_BLOCK.PRESSED;
              };

              const getTileStyles = () =>
                letter ? styles.tile : { display: "none" };

              return (
                <LetterButton
                  key={`${id}-${letter}-${letterIdx}`}
                  disabled={
                    tiles[letter].pressed && contestableLetter !== letter
                  }
                  onPress={handleLetterPressed}
                  style={getTileStyles()}
                  backgroundImageSource={getTileBackgroundImageSource()}
                >
                  {letter}
                </LetterButton>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Board;
