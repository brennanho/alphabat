import React, { createContext, useReducer } from "react";
import {
  APP_CONTEXT,
  CATEGORIES,
  MAX_PLAYERS,
  NUMBER_OF_CATEGORIES_TO_SELECT,
} from "@src/constants";
import { Assets, Player } from "@src/types";

const initialState = {
  assets: { images: {}, animations: {} } as Assets,
  players: new Map<string, Player>([]),
  playerToChooseCategory: "",
  categories: CATEGORIES,
  addPlayer: (player: string) => null,
  removePlayer: (player: string) => null,
  setNextRound: (player: string) => null,
  resetGame: () => null,
};

const appReducer = (state, action) => {
  const updatedPlayers: Map<string, Player> = new Map(state.players);
  switch (action.type) {
    case APP_CONTEXT.ACTIONS.ADD_PLAYER:
      const playerNameToAdd = action.payload.trim();
      const numPlayers = state.players.size;
      if (numPlayers >= MAX_PLAYERS || updatedPlayers.has(playerNameToAdd))
        return state;
      updatedPlayers.set(playerNameToAdd, {
        lives: 3,
        name: playerNameToAdd,
        icon: state.assets.images.characters.pop(),
      });
      return {
        ...state,
        players: updatedPlayers,
        playerToChooseCategory: (updatedPlayers.values().next().value || {})
          .name,
      };
    case APP_CONTEXT.ACTIONS.REMOVE_PLAYER:
      const playerNameToRemove = action.payload;
      const iconToPutBack = updatedPlayers.get(playerNameToRemove).icon;
      updatedPlayers.delete(playerNameToRemove);
      state.assets.images.characters.push(iconToPutBack);
      return {
        ...state,
        players: updatedPlayers,
        playerToChooseCategory: (updatedPlayers.values().next().value || {})
          .name,
      };
    case APP_CONTEXT.ACTIONS.SET_NEXT_ROUND:
      const playerToChooseCategory = action.payload;
      const updatedCategories = [...state.categories];
      updatedCategories.splice(0, NUMBER_OF_CATEGORIES_TO_SELECT);
      const updatedPlayersCopy = new Map(updatedPlayers);

      updatedPlayersCopy.forEach((player, playerName) => {
        if (playerName !== playerToChooseCategory) {
          player.lives -= 1;
        }
      });

      return {
        ...state,
        players: updatedPlayersCopy,
        categories: updatedCategories,
        playerToChooseCategory,
      };
    case APP_CONTEXT.ACTIONS.RESET_GAME:
      updatedPlayers.forEach((player: Player, playerName: string) => {
        updatedPlayers.set(playerName, { ...player, lives: 3 });
      });
      return {
        ...initialState,
        assets: state.assets,
        players: updatedPlayers,
        playerToChooseCategory: (updatedPlayers.values().next().value || {})
          .name,
      };
    default:
      return state;
  }
};

export const AppContext = createContext(initialState);

export const AppContextProvider = ({ assets, children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    assets,
  });

  const addPlayer = (playerName: string) => {
    dispatch({ type: APP_CONTEXT.ACTIONS.ADD_PLAYER, payload: playerName });
  };

  const removePlayer = (playerName: string) => {
    dispatch({ type: APP_CONTEXT.ACTIONS.REMOVE_PLAYER, payload: playerName });
  };

  const setNextRound = (playerName: string) => {
    dispatch({ type: APP_CONTEXT.ACTIONS.SET_NEXT_ROUND, payload: playerName });
  };

  const resetGame = () => {
    dispatch({ type: APP_CONTEXT.ACTIONS.RESET_GAME });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addPlayer,
        removePlayer,
        setNextRound,
        resetGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
