import { useId } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "@src/components";
import { BOARD } from "./constants";

const styles = StyleSheet.create({
  board: {
    position: "absolute",
    padding: 8,
    zIndex: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-end",
  },
  row: {
    height: "10%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  letter: {
    minWidth: 72,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    backgroundColor: "white",
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

              const getButtonStyles = () => {
                const { pressed } = tiles[letter];
                let backgroundColor = "white";
                if (pressed) {
                  backgroundColor =
                    contestableLetter === letter ? "lightgreen" : "lightpink";
                }
                return letter
                  ? { ...styles.letter, backgroundColor }
                  : { display: "none" };
              };

              return (
                <Button
                  key={`${id}-${letter}-${letterIdx}`}
                  text={letter}
                  disabled={tiles[letter].pressed}
                  onPress={handleLetterPressed}
                  style={getButtonStyles()}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Board;
