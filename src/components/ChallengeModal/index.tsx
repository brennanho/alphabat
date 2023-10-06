import React from "react";
import { Button } from "@src/components";
import { STYLES } from "@src/constants";
import { StyleSheet, Modal, SafeAreaView, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  content: {
    backgroundColor: "#E2E2E2",
    padding: 16,
    ...STYLES.ELEVATION,
  },
  options: {
    height: "25%",
    marginTop: 32,
  },
});

const ChallengeModal = ({
  visible,
  playerName,
  onDeniedPressed,
  onAllowPressed,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text>
            Allow {playerName}'s answer? If you select DENY, {playerName} will
            be eliminated from this round.
          </Text>
          <View style={styles.options}>
            <Button onPress={onDeniedPressed}>Deny</Button>
            <Button onPress={onAllowPressed}>Allow</Button>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ChallengeModal;
