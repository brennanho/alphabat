import React, { createContext, useReducer } from "react";
import {
  APP_CONTEXT,
  CATEGORIES,
  MAX_PLAYERS,
  NUMBER_OF_CATEGORIES_TO_SELECT,
} from "@src/constants";
import { ICONS } from "@assets/index";

const initialState = {
  _internal: { icons: { characters: ICONS.CHARACTERS } },
  players: {},
  playerNames: [],
  playerToChooseCategory: "",
  categories: CATEGORIES,
  addPlayer: (player: string) => null,
  removePlayer: (player: string) => null,
  setNextRound: (player: string) => null,
};

const appReducer = (state, action) => {
  const updatedPlayers = { ...state.players };
  switch (action.type) {
    case APP_CONTEXT.ACTIONS.ADD_PLAYER:
      const playerNameToAdd = action.payload.trim();
      const numPlayers = Object.keys(state.players).length;
      if (numPlayers >= MAX_PLAYERS || playerNameToAdd in updatedPlayers)
        return state;
      updatedPlayers[playerNameToAdd] = {
        score: 0,
        name: playerNameToAdd,
        icon: state._internal.icons.characters.pop(),
      };
      return {
        ...state,
        players: updatedPlayers,
        playerToChooseCategory: state.playerToChooseCategory || playerNameToAdd,
      };
    case APP_CONTEXT.ACTIONS.REMOVE_PLAYER:
      const playerNameToRemove = action.payload;
      const iconToPutBack = updatedPlayers[playerNameToRemove].icon;
      state._internal.icons.characters.push(iconToPutBack);
      delete updatedPlayers[playerNameToRemove];
      return { ...state, players: updatedPlayers };
    case APP_CONTEXT.ACTIONS.SET_NEXT_ROUND:
      const playerToChooseCategory = action.payload;
      const updatedCategories = [...state.categories];
      updatedCategories.splice(0, NUMBER_OF_CATEGORIES_TO_SELECT);
      updatedPlayers[playerToChooseCategory].score += 1;
      return {
        ...state,
        players: updatedPlayers,
        categories: updatedCategories,
        playerToChooseCategory,
      };
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

  const setNextRound = (playerName: string) => {
    dispatch({ type: APP_CONTEXT.ACTIONS.SET_NEXT_ROUND, payload: playerName });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        playerNames: Object.keys(state.players),
        addPlayer,
        removePlayer,
        setNextRound,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
