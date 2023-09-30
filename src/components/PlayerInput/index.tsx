import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 12,
    elevation: 5,
    backgroundColor: "white",
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
    fontSize: 32,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const PlayerInput = ({ onAddPlayer }) => {
  const [text, setText] = useState("");

  const handleChangeText = (updatedText: string) => {
    setText(updatedText);
  };

  const handleAddName = () => {
    onAddPlayer(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={handleChangeText}
        value={text}
        style={styles.input}
        autoCapitalize="characters"
      />
      <TouchableHighlight onPress={handleAddName}>
        <Text style={styles.buttonAdd}>+</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PlayerInput;
