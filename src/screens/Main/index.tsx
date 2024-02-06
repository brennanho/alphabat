import React, { useContext } from "react";
import { StyleSheet, View, Image, KeyboardAvoidingView, Platform } from "react-native";
import LottieView from "lottie-react-native";
import Animated, { FadeInDown, FadeInUp, FadeOutDown, JumpingTransition } from "react-native-reanimated";
import { Page, PlayerInput, PlayersInMain, Button, AutoScaleText } from "@src/components";
import { useKeyboard } from "@react-native-community/hooks";
import { AppContext } from "@src/store";
import { SCREENS, STYLES } from "@src/constants";

const styles = StyleSheet.create({
  title: { width: "100%", flex: 1, ...STYLES.ELEVATION },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  playersContainer: { display: "flex", flexDirection: "row", flex: 2 },
  players: { flex: 3 },
  playerInput: {
    flex: 1,
  },
  startGameButton: {
    flex: 1,
  },
  startGameText: {
    fontSize: 44,
  },
  beam: {
    height: "120%",
    flex: 1,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 4,
  },
  input: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    gap: 0,
    height: "100%",
    width: "100%",
    paddingTop: 8,
    paddingBottom: 16,
  },
  speakerLeft: {
    flex: 1,
    height: "100%",
  },
  speakerRight: {
    transform: [{ scaleX: -1 }],
    flex: 1,
    height: "100%",
  },
});

const Main = ({ navigation }) => {
  const { players, addPlayer, removePlayer, assets } = useContext(AppContext);
  const startGameDisabled = players.size <= 1;
  const animationSpeed = 0.75;

  const handleAddPlayer = (playerName: string) => {
    addPlayer(playerName);
  };

  const handleRemovePlayer = (playerName: string) => {
    removePlayer(playerName);
  };

  const handleNavigation = () => {
    navigation.navigate(SCREENS.CATEGORY_SELECTION);
  };

  return (
    <>
      <Page>
        <View style={styles.main}>
          <LottieView source={assets.animations.title} resizeMode="contain" style={styles.title} autoPlay speed={animationSpeed} />
          <View style={styles.playersContainer}>
            <LottieView source={assets.animations.beam} style={styles.beam} resizeMode="contain" autoPlay speed={animationSpeed} />
            <PlayersInMain style={styles.players} players={players} onRemovePlayer={handleRemovePlayer} />
            <LottieView source={assets.animations.beam} style={styles.beam} resizeMode="contain" autoPlay speed={animationSpeed} />
          </View>
          <View style={styles.footer}>
            <LottieView source={assets.animations.speaker} style={styles.speakerLeft} resizeMode="contain" autoPlay speed={animationSpeed} />
            <View style={styles.input}>
              <PlayerInput style={styles.playerInput} onAddPlayer={handleAddPlayer} />
              <Button
                style={styles.startGameButton}
                textStyles={styles.startGameText}
                disabled={startGameDisabled}
                // withWideBackgroundImage
                onPress={handleNavigation}
              >
                PLAY
              </Button>
            </View>
            <LottieView source={assets.animations.speaker} resizeMode="contain" style={styles.speakerRight} autoPlay  speed={animationSpeed}/>
          </View>
        </View>
      </Page>
    </>
  );
};

export default Main;
