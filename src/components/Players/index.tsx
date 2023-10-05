import React from "react";
import { Player } from "@src/components";
import { View } from "react-native";

const Players = ({ players, playerTurnIndex }) => {
  return (
    <View style={{ display: "flex", flexDirection: "column", width: "100%", height: "10%" }}>
      {players.map((player, idx: number) => {
        const playerTextStyles = {
          fontSize: 24,
          fontWeight: idx === playerTurnIndex ? 700 : 400,
          color: player.alive ? "green" : "red",
        };
        return (
          <Player player={player} textStyle={playerTextStyles} key={player.name} />
        );
      })}
    </View>
  );
};

export default Players;
