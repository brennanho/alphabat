import { View, Text } from "react-native";

const Players = ({ players, playerTurnIndex }) => {
  return (
    <View>
      {players.map((player, idx) => {
        const playerStyles = {
          fontWeight: idx === playerTurnIndex ? 700 : 400,
          color: player.alive ? "green" : "red",
        };

        return (
          <Text key={player.name} style={playerStyles}>
            {player.name}
          </Text>
        );
      })}
    </View>
  );
};

export default Players;
