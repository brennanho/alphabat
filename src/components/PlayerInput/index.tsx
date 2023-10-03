import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { Button } from '@src/components';
import { STYLES } from "@src/constants";

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
  }
});

const PlayerInput = ({ onAddPlayer, style = {} }) => {
  const [text, setText] = useState("");

  const handleChangeText = (updatedText: string) => {
    setText(updatedText);
  };

  const handleAddName = () => {
    if (text) onAddPlayer(text);
  };

  return (
    <View style={{...styles.container, ...style}}>
      <TextInput
        onChangeText={handleChangeText}
        value={text}
        style={styles.input}
        autoCapitalize="characters"
      />
      <Button style={styles.buttonAdd} onPress={handleAddName} elevation={false}>
        +
      </Button>
    </View>
  );
};

export default PlayerInput;
