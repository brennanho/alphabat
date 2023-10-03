import { useId } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "@src/components";
import { BOARD } from "./constants";

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

              const getTileStyles = () => {
                const { pressed } = tiles[letter];
                let backgroundColor = "white";
                if (pressed) {
                  backgroundColor =
                    contestableLetter === letter ? "lightgreen" : "lightpink";
                }
                return letter
                  ? { ...styles.tile, backgroundColor }
                  : { display: "none" };
              };

              return (
                <Button
                  key={`${id}-${letter}-${letterIdx}`}
                  disabled={tiles[letter].pressed && contestableLetter !== letter}
                  onPress={handleLetterPressed}
                  style={getTileStyles()}
                >
                  {letter}
                </Button>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Board;
