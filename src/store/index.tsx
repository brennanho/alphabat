import React, { createContext, useReducer } from "react";
import {
  APP_CONTEXT,
  CATEGORIES,
  MAX_PLAYERS,
  NUMBER_OF_CATEGORIES_TO_SELECT,
} from "@src/constants";

const initialState = {
  players: {},
  playerToChooseCategory: "",
  categories: CATEGORIES,
  addPlayer: (player: string) => null,
  removePlayer: (player: string) => null,
  removeCategories: () => null,
};

const appReducer = (state, action) => {
  const updatedPlayers = { ...state.players };
  switch (action.type) {
    case APP_CONTEXT.ACTIONS.ADD_PLAYER:
      const playerNameToAdd = action.payload;
      if (Object.keys(state.players).length >= MAX_PLAYERS) return;
      updatedPlayers[playerNameToAdd] = {
        score: 0,
        name: playerNameToAdd,
      };
      return {
        ...state,
        players: updatedPlayers,
        playerToChooseCategory: state.playerToChooseCategory || playerNameToAdd,
      };
    case APP_CONTEXT.ACTIONS.REMOVE_PLAYER:
      const playerNameToRemove = action.payload;
      delete updatedPlayers[playerNameToRemove];
      return { ...state, players: updatedPlayers };
    case APP_CONTEXT.ACTIONS.REMOVE_CATEGORIES:
      const updatedCategories = [...state.categories];
      updatedCategories.splice(0, NUMBER_OF_CATEGORIES_TO_SELECT);
      return { ...state, categories: updatedCategories };
    default:
      return state;
  }
};

export const AppContext = createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addPlayer = (playerName: string) => {
    dispatch({ type: APP_CONTEXT.ACTIONS.ADD_PLAYER, payload: playerName });
  };

  const removePlayer = (playerName: string) => {
    dispatch({ type: APP_CONTEXT.ACTIONS.REMOVE_PLAYER, payload: playerName });
  };

  const removeCategories = () => {
    dispatch({ type: APP_CONTEXT.ACTIONS.REMOVE_CATEGORIES });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addPlayer,
        removePlayer,
        removeCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
