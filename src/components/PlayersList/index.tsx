import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

const styles = StyleSheet.create({
  playerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
  playerText: {
    fontSize: 28,
  },
  cancelText: {
    fontSize: 16,
  },
});

const PlayersList = ({ players, onRemovePlayer, style = {} }) => {
  return (
    <View style={style}>
      <FlatList
        data={players}
        // Player component
        renderItem={({ item: playerName }) => {
          const handlePress = () => onRemovePlayer(playerName);

          return (
            <View style={styles.playerWrapper}>
              <Text style={styles.playerText}>{playerName}</Text>
              <TouchableHighlight onPress={handlePress}>
                <Text style={styles.cancelText}>✕</Text>
              </TouchableHighlight>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PlayersList;
