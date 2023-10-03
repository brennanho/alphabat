import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { ICONS } from "@assets/index";
import { Button } from "@src/components";
import { Player } from "@src/types";
import { STYLES } from "@src/constants";

const styles = StyleSheet.create({
  iconWrapper: {
    // width: 300,
    height: 400,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
  },
});

const PlayersList = ({
  players,
  onRemovePlayer = (playerName) => null,
  style = {},
}) => {
  return (
    <View style={{ ...style, position: "relative", ...STYLES.ELEVATION }}>
      <View style={styles.iconWrapper}>
        <Image
          source={require('../../../assets/Arrphabets.png')}
          resizeMode="stretch"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      {Object.values(players).map((player: Player, index: number) => {
        const handlePress = () => onRemovePlayer(player.name);
        return (
          <View style={styles.iconWrapper}>
            {/* <Button
                style={styles.cancelButton}
                onPress={handlePress}
                fontSize={16}
              >
                ✕
              </Button> */}
            <Image
              source={ICONS.CHARACTERS.ACTIVE[index]}
              resizeMode="stretch"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default PlayersList;
