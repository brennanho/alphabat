import React, { useContext } from "react";
import { AutoScaleText, Button } from "@src/components";
import { STYLES } from "@src/constants";
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import { FONTS } from "@assets/index";
import { AppContext } from "@src/store";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  content: {
    position: "relative",
    paddingBottom: 32,
    paddingTop: 16,
    margin: 16,
    ...STYLES.ELEVATION,
  },
  options: {
    height: "25%",
    gap: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  playerIcon: { width: 32, height: 32, position: "absolute", top: 8, right: 8  },
  message: {
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR_WHITE,
    fontSize: 128,
    padding: 24,
  },
});

const ChallengeModal = ({
  visible,
  player,
  onDeniedPressed,
  onAllowPressed,
}) => {
  const {
    assets: { images },
  } = useContext(AppContext);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <BlurView>
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={images.background.main}
            style={styles.content}
            resizeMode="cover"
          >
            <Image
              style={styles.playerIcon}
              resizeMode="contain"
              source={player.icon}
            />
            <AutoScaleText style={styles.message} lines={3}>
              Allow {player.name}'s answer? If you select DENY, {player.name}
              will be eliminated from this round.
            </AutoScaleText>
            <View style={styles.options}>
              <Button withWideBackgroundImage onPress={onDeniedPressed}>
                Deny
              </Button>
              <Button withWideBackgroundImage onPress={onAllowPressed}>
                Allow
              </Button>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
};

export default ChallengeModal;
