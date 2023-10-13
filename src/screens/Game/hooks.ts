import { useState } from "react";
import { INITIAL_BOARD_STATE } from "./constants";
import { Player } from "@src/types";
import { TOTAL_LETTER_COUNT } from "@src/constants";

function getNextPlayerIdx(players, startIndex) {
  let currentIndex = startIndex;
  for (let i = 0; i < players.length; i++) {
    currentIndex = (currentIndex + 1) % players.length;
    if (players[currentIndex].alive) return currentIndex;
  }
  return -1;
}

function getRandomTurnIndex(length) {
  return Math.floor(Math.random() * length);
}

export const useGame = (playersMap: Map<string, Player>) => {
  const [gameState, setGameState] = useState({
    ...INITIAL_BOARD_STATE,
    players: Array.from(playersMap).map(([, player]) => {
      return { name: player.name, alive: true, icon: player.icon };
    }),
    turnIndex: getRandomTurnIndex(playersMap.size),
    prevTurnIndex: 0,
    prevLetterPressed: "",
    gameOver: false,
  });

  function killCurrentPlayer() {
    const { players: updatedPlayers, turnIndex } = gameState;
    updatedPlayers[turnIndex] = { ...updatedPlayers[turnIndex], alive: false };

    setGameState({
      ...gameState,
      players: updatedPlayers,
      prevTurnIndex: turnIndex,
      turnIndex: getNextPlayerIdx(updatedPlayers, turnIndex),
    });
  }

  function moveToNextPlayer(letter: string) {
    const { players, tiles, turnIndex, tilesPressed } = gameState;
    setGameState({
      ...gameState,
      tiles: {
        ...tiles,
        [letter]: { pressed: true },
      },
      contestableLetter: letter,
      turnIndex: getNextPlayerIdx(players, turnIndex),
      prevTurnIndex: turnIndex,
      prevLetterPressed: letter,
      tilesPressed: tilesPressed + 1,
      ...(tilesPressed + 1 === TOTAL_LETTER_COUNT ? INITIAL_BOARD_STATE : {}),
    });
  }

  function killPlayerWithBadAnswer() {
    const {
      players: updatedPlayers,
      prevTurnIndex,
      tiles,
      prevLetterPressed,
    } = gameState;

    updatedPlayers[prevTurnIndex] = {
      ...updatedPlayers[prevTurnIndex],
      alive: false,
    };
    setGameState({
      ...gameState,
      players: updatedPlayers,
      contestableLetter: "",
      tiles: {
        ...tiles,
        [prevLetterPressed]: { pressed: false },
      },
    });
  }

  return {
    moveToNextPlayer,
    killCurrentPlayer,
    killPlayerWithBadAnswer,
    tiles: gameState.tiles,
    contestableLetter: gameState.contestableLetter,
    players: gameState.players,
    playerToAct: gameState.players[gameState.turnIndex],
    playerToContest: gameState.players[gameState.prevTurnIndex],
    gameOver:
      Object.values(gameState.players).filter((player) => player.alive)
        .length === 1,
  };
};
