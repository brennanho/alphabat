import { FONTS } from "@assets/index";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  player: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  playerIcon: { width: "100%", height: "50%" },
  playerText: { fontSize: 32, fontFamily: FONTS.BOLD.NAME },
});

const Player = ({ player, style = {}, textStyle = {} }) => {
  return (
    <View style={{ ...styles.player, ...style }}>
      <Image
        source={player.icon}
        style={styles.playerIcon}
        resizeMode="contain"
      />
      <Text style={{...styles.playerText, ...textStyle}}>{player.name}</Text>
    </View>
  );
};

export default Player;
