import { StyleSheet, Text, Modal, View, SafeAreaView } from "react-native";
import { Page, Board, Players, Button } from "@src/components";
import { useContext } from "react";
import { AppContext } from "@src/store";
import { useGame } from "./hooks";
import { SCREENS, STYLES } from "@src/constants";

const styles = StyleSheet.create({
  category: {
    fontSize: 32,
    marginBottom: 64,
  },
  playersList: {
    height: 300,
  },
});

const Game = ({
  route: {
    params: { category },
  },
  navigation,
}) => {
  const { playerNames, setNextRound } = useContext(AppContext);
  const {
    timer: { paused, resume },
    tiles,
    contestableLetter,
    timer: { seconds },
    pressLetterTile,
    players,
    playerTurnIndex,
  } = useGame(playerNames, handleRoundOver);

  const handleLetterPressed = (letter: string) => pressLetterTile(letter);

  function handleRoundOver(playerName: string) {
    setNextRound(playerName);
    navigation.navigate(SCREENS.CATEGORY_SELECTION);
  }

  function handleAllowPressed() {
    resume();
  }

  function handleDeniedPressed() {
    resume();
  }

  return (
    <Page>
      <Text style={styles.category}>{category}</Text>
      <Players players={players} playerTurnIndex={playerTurnIndex} />
      <Text>{seconds}</Text>
      <Board
        tiles={tiles}
        onTilePressed={handleLetterPressed}
        contestableLetter={contestableLetter}
      />
      <Modal
        visible={paused}
        animationType="slide"
        transparent
        style={
          {
            // width: "100%",
            // height: "100%",
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }
        }
      >
        <SafeAreaView
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <View style={{ backgroundColor: "#E2E2E2", padding: 16, ...STYLES.ELEVATION }}>
            <Text>
              Allow {players[playerTurnIndex].name}'s answer? If you select
              DENY, {players[playerTurnIndex].name} will be eliminated from this
              round.
            </Text>
            <View style={{ height: "25%", marginTop: 32 }}>
              <Button onPress={handleDeniedPressed}>Deny</Button>
              <Button onPress={handleAllowPressed}>Allow</Button>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </Page>
  );
};

export default Game;
