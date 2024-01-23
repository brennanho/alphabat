import React, { useContext, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";
import { AutoScaleText, Button } from "@src/components";
import { STYLES } from "@src/constants";
import { FONTS } from "@assets/index";
import { AppContext } from "@src/store";
import ReactNativeModal from "react-native-modal";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    paddingRight: 8,
    ...STYLES.ELEVATION,
  },
  modalInput: {
    fontSize: 24,
    flex: 1,
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR_WHITE,
  },
  input: {
    justifyContent: "center",
    fontSize: 16,
    padding: 8,
    paddingLeft: 24,
    fontFamily: FONTS.REGULAR.NAME,
    color: STYLES.TEXT_COLOR_WHITE,
    flex: 2,
  },
  modalBackground: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 24,
  },
});

const PlayerInput = ({ onAddPlayer, style = {} }) => {
  const {
    assets: { images },
  } = useContext(AppContext);
  const [playerName, setPlayerName] = useState("");
  const [inputModal, toggleInputModal] = useState(false);
  const ref = useRef(null);

  const handleChangeText = (updatedText: string) => {
    setPlayerName(updatedText);
  };

  const handleAddName = () => {
    if (playerName) {
      onAddPlayer(playerName);
      setPlayerName("");
    }
  };

  const handleSubmitName = () => {
    toggleInputModal(false);
    handleAddName();
  };

  const handleOpenModal = () => {
    toggleInputModal(true);
  };

  const handleModalBackdropPress = () => toggleInputModal(false);

  return (
    <>
      <ReactNativeModal
        isVisible={inputModal}
        onBackdropPress={handleModalBackdropPress}
      >
        <ImageBackground
          source={images.textInput}
          style={styles.modalBackground}
          resizeMode="contain"
        >
          <TextInput
            ref={ref}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmitName}
            value={playerName}
            style={styles.modalInput}
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={16}
            numberOfLines={1}
            returnKeyType="done"
            placeholder="Add player..."
            placeholderTextColor={STYLES.TEXT_COLOR_PLACEHOLDER}
            autoFocus
          />
          <Button onPress={handleSubmitName} withBackground={false}>
            +
          </Button>
        </ImageBackground>
      </ReactNativeModal>
      <ImageBackground
        style={{ ...styles.container, ...style }}
        source={images.textInput}
        resizeMode="contain"
      >
        <Pressable onPressIn={handleOpenModal} style={styles.input}>
          <AutoScaleText>{playerName}</AutoScaleText>
        </Pressable>
        <Button onPress={handleAddName} withBackground={false}>
          +
        </Button>
      </ImageBackground>
    </>
  );
};

export default PlayerInput;
