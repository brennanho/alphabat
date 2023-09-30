import { TouchableHighlight, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 32,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 5,
    backgroundColor: "white",
  },
});

const Button = ({ onPress, text, disabled = false, style = {}, ...props }) => {
  return (
    <TouchableHighlight onPress={onPress} disabled={disabled} {...props}>
      <Text
        style={{
          ...styles.button,
          ...style,
        }}
      >
        {text}
      </Text>
    </TouchableHighlight>
  );
};

export default Button;
