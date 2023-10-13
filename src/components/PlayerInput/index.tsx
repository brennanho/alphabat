import React, { useContext, useState } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import { Button } from "@src/components";
import { STYLES } from "@src/constants";
import { FONTS } from "@assets/index";
import { AppContext } from "@src/store";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    ...STYLES.ELEVATION,
  },
  input: {
    height: "100%",
    fontSize: 24,
    padding: 8,
    paddingLeft: "15%",
    fontFamily: FONTS.BOLD.NAME,
    color: STYLES.TEXT_COLOR_WHITE,
    flex: 2,
  },
  buttonAdd: {
    flex: 1,
    paddingRight: 12,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

const PlayerInput = ({ onAddPlayer, style = {} }) => {
  const {
    assets: { images },
  } = useContext(AppContext);
  const [playerName, setPlayerName] = useState("");

  const handleChangeText = (updatedText: string) => {
    setPlayerName(updatedText);
  };

  const handleAddName = () => {
    if (playerName) onAddPlayer(playerName);
  };

  return (
    <View style={{ ...styles.container, ...style }}>
      <Image
        source={images.textInput}
        style={styles.background}
        resizeMode="cover"
      />
      <TextInput
        onChangeText={handleChangeText}
        onSubmitEditing={handleAddName}
        value={playerName}
        style={styles.input}
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={16}
        returnKeyType="done"
        placeholder="Add player..."
        placeholderTextColor={STYLES.TEXT_COLOR_PLACEHOLDER}
      />
      <Button
        style={styles.buttonAdd}
        onPress={handleAddName}
        withBackground={false}
      >
        +
      </Button>
    </View>
  );
};

export default PlayerInput;
