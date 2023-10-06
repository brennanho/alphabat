import React, { useContext } from "react";
import { StyleSheet, Text, Modal, View, SafeAreaView } from "react-native";
import { Page, Board, Button, PlayersInGame } from "@src/components";
import { AppContext } from "@src/store";
import { useGame } from "./hooks";
import { SCREENS, STYLES } from "@src/constants";
import ChallengeModal from "@src/components/ChallengeModal";

const styles = StyleSheet.create({
  category: {
    fontSize: 32,
  },
  innerBoard: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    height: "70%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const Game = ({
  route: {
    params: { category },
  },
  navigation,
}) => {
  const { players: playerMap, setNextRound } = useContext(AppContext);
  const {
    timer: { paused, resume, seconds },
    tiles,
    contestableLetter,
    pressLetterTile,
    killPlayerWithBadAnswer,
    players,
    playerToAct,
    playerToContest,
  } = useGame(playerMap, handleRoundOver);

  function handleLetterPressed(letter: string) {
    pressLetterTile(letter);
  }

  function handleRoundOver(playerName: string) {
    setNextRound(playerName);
    navigation.navigate(SCREENS.CATEGORY_SELECTION);
  }

  function handleAllowPressed() {
    resume();
  }

  function handleDeniedPressed() {
    killPlayerWithBadAnswer();
    resume();
  }

  return (
    <Page>
      <Board
        tiles={tiles}
        onTilePressed={handleLetterPressed}
        contestableLetter={contestableLetter}
      />
      <View style={styles.innerBoard}>
        <Text style={styles.category}>{category}</Text>
        <PlayersInGame players={players} playerToAct={playerToAct} />
        <Text>{seconds}</Text>
        <ChallengeModal visible={paused} playerName={playerToContest.name} onAllowPressed={handleAllowPressed} onDeniedPressed={handleDeniedPressed}/>
      </View>
    </Page>
  );
};

export default Game;
