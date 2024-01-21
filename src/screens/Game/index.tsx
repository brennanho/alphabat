import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
import {
  Page,
  Board,
  PlayersInGame,
  ChallengeModal,
  Timer,
  AutoScaleText,
} from "@src/components";
import { useTimer } from "@src/components/Timer";
import { AppContext } from "@src/store";
import { useGame } from "./hooks";
import { SCREENS, STYLES } from "@src/constants";
import { FONTS } from "@assets/index";

const styles = StyleSheet.create({
  category: {
    fontSize: 80,
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR,
  },
  innerBoard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "50%",
    height: "70%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerBoardBody: {
    display: "flex",
    flexDirection: "column",
    flex: 4,
    height: "100%",
    width: "100%",
  },
  timer: {
    flex: 1,
    width: "100%",
  },
});

const Game = ({
  route: {
    params: { category, playerToActFirst },
  },
  navigation,
}) => {
  const { players: playerMap, setNextRound } = useContext(AppContext);
  const { ref: timerRef, paused, play, pause, resume, reset } = useTimer();
  const [loaded, setLoaded] = useState({ board: false });
  const {
    tiles,
    contestableLetter,
    players,
    playerToAct,
    playerToContest,
    gameOver,
    moveToNextPlayer,
    killCurrentPlayer,
    killPlayerWithBadAnswer,
  } = useGame(playerMap, playerToActFirst);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setNextRound(playerToAct.name);
        navigation.navigate(SCREENS.CATEGORY_SELECTION);
      }, 1000);
    }
  }, [gameOver]);

  useEffect(() => {
    if (loaded.board) play();
  }, [loaded]);

  function handleTimerEnd() {
    // killCurrentPlayer();
    // reset();
  }

  function handleLetterPressed(letter: string) {
    if (!loaded.board) return;
    else if (letter === contestableLetter) {
      pause();
    } else {
      moveToNextPlayer(letter);
      reset();
    }
  }

  function handleAllowPressed() {
    resume();
  }

  function handleDeniedPressed() {
    killPlayerWithBadAnswer();
    resume();
  }

  const handleBoardAnimationFinish = () => {
    setLoaded({ ...loaded, board: true });
  };

  return (
    <Page>
      <Board
        tiles={tiles}
        onTilePressed={handleLetterPressed}
        contestableLetter={contestableLetter}
        onAnimationFinish={handleBoardAnimationFinish}
      />
      {loaded.board && (
        <View style={styles.innerBoard}>
          <AutoScaleText style={styles.category}>{category}</AutoScaleText>
          <Animated.View
            style={styles.innerBoardBody}
            entering={BounceIn.duration(500)}
          >
            <PlayersInGame players={players} playerToAct={playerToAct} />
          </Animated.View>
          <Timer
            ref={timerRef}
            onTimerEnd={handleTimerEnd}
            style={styles.timer}
          />
          <ChallengeModal
            visible={paused}
            playerName={playerToContest.name}
            onAllowPressed={handleAllowPressed}
            onDeniedPressed={handleDeniedPressed}
          />
        </View>
      )}
    </Page>
  );
};

export default Game;
