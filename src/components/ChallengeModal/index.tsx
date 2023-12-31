import React, { useContext } from "react";
import { AutoScaleText, Button } from "@src/components";
import { STYLES } from "@src/constants";
import { StyleSheet, Modal, SafeAreaView, View, Image } from "react-native";
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
    width: "90%",
    ...STYLES.ELEVATION,
  },
  options: {
    height: "25%",
    gap: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  message: {
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR_WHITE,
    fontSize: 128,
    padding: 24,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

const ChallengeModal = ({
  visible,
  playerName,
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
          <View style={styles.content}>
            <Image
              source={images.background.main}
              style={styles.background}
              resizeMode="cover"
            />
            <AutoScaleText style={styles.message} lines={3}>
              Allow {playerName}'s answer? If you select DENY, {playerName} will
              be eliminated from this round.
            </AutoScaleText>
            <View style={styles.options}>
              <Button onPress={onDeniedPressed}>Deny</Button>
              <Button onPress={onAllowPressed}>Allow</Button>
            </View>
          </View>
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
};

export default ChallengeModal;
