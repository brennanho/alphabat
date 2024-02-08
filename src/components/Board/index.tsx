import React, { useId, useState, useEffect, useContext } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { LetterButton } from "@src/components";
import { BOARD } from "./constants";
import { TOTAL_LETTER_COUNT } from "@src/constants";
import { AppContext } from "@src/store";
import Constants from "expo-constants";
import { Device } from "@src/types";

const styles = StyleSheet.create({
  board: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    marginTop: Platform.OS === Device.IOS ? Constants.statusBarHeight : 0,
    width: "100%",
    height: "100%",
    display: "flex",
    padding: 8,
    rowGap: 16,
  },
  row: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 8,
  },
  columnFiller: {
    flex: 3,
  },
});

const Board = ({
  tiles,
  contestableLetter,
  onTilePressed,
  style = {},
  onAnimationFinish,
}) => {
  const id = useId();
  const [letterAnimationsComplete, setLetterAnimationsComplete] = useState(0);
  const {
    assets: {
      animations: { board },
    },
  } = useContext(AppContext);

  useEffect(() => {
    if (letterAnimationsComplete === TOTAL_LETTER_COUNT) onAnimationFinish();
  }, [letterAnimationsComplete]);

  return (
    <View style={{ ...styles.board, ...style }}>
      {BOARD.map((row, rowIdx) => {
        return (
          <View key={`${id}-${rowIdx}`} style={styles.row}>
            {row.map((letter, letterIdx) => {
              const handleLetterPressed = () => {
                onTilePressed(letter);
              };

              const handleLetterAnimationFinish = () => {
                setLetterAnimationsComplete((letterAnimationsComplete) => {
                  return letterAnimationsComplete + 1;
                });
              };

              if (!letter) {
                return <View style={styles.columnFiller} />;
              }

              return (
                <LetterButton
                  key={`${id}-${letter}-${letterIdx}`}
                  disabled={
                    tiles[letter].pressed && contestableLetter !== letter
                  }
                  contestable={contestableLetter === letter}
                  animationDelay={250 * (rowIdx + 1)}
                  onPress={handleLetterPressed}
                  onAnimationFinish={handleLetterAnimationFinish}
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
