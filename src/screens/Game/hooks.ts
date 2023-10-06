import { useState } from "react";
import { useTimer } from "react-timer-hook";
import { INITIAL_BOARD_STATE, TIMEOUT } from "./constants";
import { Player } from "@src/types";

function getStartTime(seconds: number) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + seconds);
  return time;
}

function getNextPlayerIdx(players, startIndex) {
  let currentIndex = startIndex;

  for (let i = 0; i < players.length; i++) {
    currentIndex = (currentIndex + 1) % players.length;
    if (players[currentIndex].alive) return currentIndex;
  }

  return -1;
}

const useCountdown = (countdownSeconds: number, onExpire) => {
  const {
    seconds,
    pause: pauseBase,
    resume: resumeBase,
    restart: restartBase,
  } = useTimer({
    expiryTimestamp: getStartTime(countdownSeconds),
    onExpire: handleExpire,
    autoStart: true,
  });
  const [paused, setPaused] = useState(false);

  function handleExpire() {
    setTimeout(() => {
      restartBase(getStartTime(countdownSeconds)), 0;
      onExpire();
    });
  }

  function resume() {
    resumeBase();
    setPaused(false);
  }

  function pause() {
    pauseBase();
    setPaused(true);
  }

  function restart() {
    restartBase(getStartTime(countdownSeconds));
  }

  return { seconds, paused, restart, pause, resume };
};

export const useGame = (
  players: Map<string, Player>,
  onRoundOver = (playerName) => null
) => {
  const [gameState, setGameState] = useState({
    ...INITIAL_BOARD_STATE,
    players: Array.from(players).map(([, player]) => {
      return { name: player.name, alive: true, icon: player.icon };
    }),
    turnIndex: 0,
    prevTurnIndex: 0,
    prevLetterPressed: "",
    paused: false,
  });

  const { seconds, paused, restart, pause, resume } = useCountdown(
    TIMEOUT,
    handlePlayerDies
  );

  function handlePlayerDies() {
    const { players: updatedPlayers, turnIndex } = gameState;
    updatedPlayers[turnIndex] = { ...updatedPlayers[turnIndex], alive: false };

    const playersAlive = updatedPlayers.filter((player) => player.alive);
    if (playersAlive.length === 1) {
      onRoundOver(playersAlive[0].name);
    } else {
      setGameState({
        ...gameState,
        players: updatedPlayers,
        prevTurnIndex: turnIndex,
        turnIndex: getNextPlayerIdx(updatedPlayers, turnIndex),
      });
      restart();
    }
  }

  function pressLetterTile(letter: string) {
    const {
      players,
      tiles,
      turnIndex,
      tilesPressed,
      contestableLetter,
      paused,
    } = gameState;
    if (letter === contestableLetter) {
      if (paused) resume();
      else pause();
    } else {
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
        ...(tilesPressed + 1 === 24 ? INITIAL_BOARD_STATE : {}),
      });
      restart();
    }
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

    const playersAlive = updatedPlayers.filter((player) => player.alive);
    if (playersAlive.length === 1) {
      onRoundOver(playersAlive[0].name);
    }

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
    timer: {
      seconds,
      resume,
      paused,
    },
    pressLetterTile,
    killPlayerWithBadAnswer,
    tiles: gameState.tiles,
    contestableLetter: gameState.contestableLetter,
    players: gameState.players,
    playerToAct: gameState.players[gameState.turnIndex],
    playerToContest: gameState.players[gameState.prevTurnIndex],
  };
};
