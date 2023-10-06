import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { Button } from '@src/components';
import { STYLES } from "@src/constants";
import { FONTS } from "@assets/index";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 12,
    backgroundColor: "white",
    ...STYLES.ELEVATION
  },
  input: {
    width: "75%",
    height: "100%",
    fontSize: 18,
    padding: 10,
    fontFamily: FONTS.REGULAR.NAME
  },
  buttonAdd: {
    height: "100%",
    textAlignVertical: "center",
    marginLeft: "auto",
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonAddText: {
    fontSize: 32,
    fontFamily: FONTS.BOLD.NAME
  }
});

const PlayerInput = ({ onAddPlayer, style = {} }) => {
  const [playerName, setPlayerName] = useState("");

  const handleChangeText = (updatedText: string) => {
    setPlayerName(updatedText);
  };

  const handleAddName = () => {
    if (playerName) onAddPlayer(playerName);
  };

  return (
    <View style={{...styles.container, ...style}}>
      <TextInput
        onChangeText={handleChangeText}
        value={playerName}
        style={styles.input}
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={10}
      />
      <Button style={styles.buttonAdd} onPress={handleAddName} elevation={false}>
        +
      </Button>
    </View>
  );
};

export default PlayerInput;
