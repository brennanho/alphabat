import { View, ScrollView, FlatList, Text, StyleSheet, Image } from "react-native";
import { Button } from "@src/components";
import { Player } from "@src/types";
import { STYLES } from "@src/constants";

const styles = StyleSheet.create({
  playerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "green",
  },
  playerText: {
    fontSize: 16,
  },
  cancelButton: {
    height: 32,
    // width: 16,
    // padding: 8,
    backgroundColor: "transparent"
  },
});

const PlayersList = ({
  players,
  onRemovePlayer = (playerName) => null,
  style = {},
}) => {
  return (
    <View style={style}>
      {Object.values(players).map((player: Player) => {
        const handlePress = () => onRemovePlayer(player.name);
        return (
          <View style={styles.playerWrapper}>
            <View style={{ display: "flex", flexDirection: "row", height: "100%", ...STYLES.ELEVATION }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  ...STYLES.ELEVATION,
                }}
              >
                <Image
                  source={player.icon}
                  style={{
                    width: "75%",
                    height: "75%",
                    resizeMode: "stretch",
                  }}
                />
                <Text style={styles.playerText}>{player.name}</Text>
              </View>
              <Button
                style={styles.cancelButton}
                onPress={handlePress}
                fontSize={16}
              >
                ✕
              </Button>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PlayersList;
