import { useState } from "react";
import { useTimer } from "react-timer-hook";
import { INITIAL_BOARD_STATE, TIMEOUT } from "./constants";

function getStartTime(seconds: number) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + seconds);
  return time;
}

function getNextPlayerIdx(players, startIndex) {
  let currentIndex = startIndex;

  for (let i = 0; i < players.length; i++) {
    currentIndex = (currentIndex + 1) % players.length;
    if (players[currentIndex].alive !== false) return currentIndex;
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
  playerNames: string[],
  onRoundOver = (playerName) => null
) => {
  const [gameState, setGameState] = useState({
    ...INITIAL_BOARD_STATE,
    players: playerNames.map((playerName: string) => {
      return { name: playerName, alive: true };
    }),
    turnIndex: 0,
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
        turnIndex: getNextPlayerIdx(updatedPlayers, turnIndex),
      });
      restart();
    }
  }

  function pressLetterTile(letter: string) {
    if (letter === gameState.contestableLetter) {
      if (gameState.paused) resume();
      else pause();
    } else {
      setGameState({
        ...gameState,
        tiles: {
          ...gameState.tiles,
          [letter]: { pressed: true },
        },
        contestableLetter: letter,
        turnIndex: getNextPlayerIdx(gameState.players, gameState.turnIndex),
        tilesPressed: gameState.tilesPressed + 1,
        ...(gameState.tilesPressed + 1 === 24 ? INITIAL_BOARD_STATE : {}),
      });
      restart();
    }
  }

  return {
    timer: {
      seconds,
      resume,
      paused,
    },
    pressLetterTile,
    tiles: gameState.tiles,
    contestableLetter: gameState.contestableLetter,
    players: gameState.players,
    playerTurnIndex: gameState.turnIndex,
  };
};
