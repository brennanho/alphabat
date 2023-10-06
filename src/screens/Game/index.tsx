import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Page, Board, PlayersInGame, ChallengeModal } from "@src/components";
import { AppContext } from "@src/store";
import { useGame } from "./hooks";
import { SCREENS } from "@src/constants";
import { ANIMATIONS, FONTS } from "@assets/index";
import { ResizeMode, Video } from "expo-av";

const styles = StyleSheet.create({
  category: {
    fontSize: 36,
    fontFamily: FONTS.BOLD.NAME,
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
  timer: {
    width: "100%",
    height: "100%",
    flex: 1,
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
  const videoRef = useRef(null);
  const [videoStatus, setVideoStatus] = useState({});

  useEffect(() => {
    videoRef.current.playFromPositionAsync(0);
  }, [playerToAct]);

  useEffect(() => {
    console.log(videoStatus);
  }, [videoStatus]);

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
        <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <View>
            <PlayersInGame players={players} playerToAct={playerToAct} />
            <Text>{seconds}</Text>
          </View>
          <Video
            ref={videoRef}
            style={styles.timer}
            source={ANIMATIONS.TIMER}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={!paused}
            isLooping
            onPlaybackStatusUpdate={(status) => setVideoStatus(status)}
          />
        </View>
        <ChallengeModal
          visible={paused}
          playerName={playerToContest.name}
          onAllowPressed={handleAllowPressed}
          onDeniedPressed={handleDeniedPressed}
        />
      </View>
    </Page>
  );
};

export default Game;
