import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Page, Board, Button } from "@src/components";
import { AppContext } from "@src/store";
import { useGame } from "./hooks";
import { SCREENS, STYLES } from "@src/constants";

const styles = StyleSheet.create({
  category: {
    fontSize: 32,
  },
  playersList: {
    height: 300,
  },
  innerBoard: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    height: "70%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  players: {
    width: "100%",
    paddingTop: 32,
    paddingBottom: 32,
    flex: 1,
    ...STYLES.ELEVATION,
  },
  player: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  playerIcon: { height: "100%", width: "40%" },
  playerText: { fontSize: 16 },
});

const Game = ({
  route: {
    params: { category },
  },
  navigation,
}) => {
  const { players: playersBase, setNextRound } = useContext(AppContext);
  const {
    timer: { paused, resume },
    tiles,
    contestableLetter,
    timer: { seconds },
    pressLetterTile,
    players,
    playerTurnIndex,
  } = useGame(playersBase, handleRoundOver);

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
      <Board
        tiles={tiles}
        onTilePressed={handleLetterPressed}
        contestableLetter={contestableLetter}
      />
      <View style={styles.innerBoard}>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.players}>
          {Object.values(players).map((player, idx) => {
            return (
              <Animated.View style={styles.player} key={player.name} entering={FadeIn} exiting={FadeOut}>
                <Image
                  source={player.icon}
                  style={styles.playerIcon}
                  resizeMode="contain"
                />
                <Text style={styles.playerText}>{player.name}</Text>
              </Animated.View>
            );
          })}
        </View>
        <Text>{seconds}</Text>
        <Modal visible={paused} animationType="slide" transparent>
          <SafeAreaView
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <View
              style={{
                backgroundColor: "#E2E2E2",
                padding: 16,
                ...STYLES.ELEVATION,
              }}
            >
              <Text>
                Allow {players[playerTurnIndex].name}'s answer? If you select
                DENY, {players[playerTurnIndex].name} will be eliminated from
                this round.
              </Text>
              <View style={{ height: "25%", marginTop: 32 }}>
                <Button onPress={handleDeniedPressed}>Deny</Button>
                <Button onPress={handleAllowPressed}>Allow</Button>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </Page>
  );
};

export default Game;
