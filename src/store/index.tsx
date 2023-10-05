import React, { createContext, useReducer } from "react";
import {
  APP_CONTEXT,
  CATEGORIES,
  MAX_PLAYERS,
  NUMBER_OF_CATEGORIES_TO_SELECT,
} from "@src/constants";
import { ICONS } from "@assets/index";
import { Player } from "@src/types";

const initialState = {
  players: new Map<string, Player>([]),
  playerToChooseCategory: "",
  categories: CATEGORIES,
  addPlayer: (player: string) => null,
  removePlayer: (player: string) => null,
  setNextRound: (player: string) => null,
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
        score: 0,
        name: playerNameToAdd,
        icon: ICONS.CHARACTERS.pop(),
      });
      return {
        ...state,
        players: updatedPlayers,
        playerToChooseCategory: (updatedPlayers.values().next().value || {}).name,
      };
    case APP_CONTEXT.ACTIONS.REMOVE_PLAYER:
      const playerNameToRemove = action.payload;
      const iconToPutBack = updatedPlayers.get(playerNameToRemove).icon;
      updatedPlayers.delete(playerNameToRemove);
      ICONS.CHARACTERS.push(iconToPutBack);
      return {
        ...state,
        players: updatedPlayers,
        playerToChooseCategory: (updatedPlayers.values().next().value || {}).name,
      };
    case APP_CONTEXT.ACTIONS.SET_NEXT_ROUND:
      const playerToChooseCategory = action.payload;
      const updatedCategories = [...state.categories];
      const playerToChooseCategoryObject = updatedPlayers.get(playerToChooseCategory);
      updatedCategories.splice(0, NUMBER_OF_CATEGORIES_TO_SELECT);
      updatedPlayers.set(playerToChooseCategory, {
        ...playerToChooseCategoryObject,
        score: playerToChooseCategoryObject.score + 1
      })
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
  console.log({state})

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
        addPlayer,
        removePlayer,
        setNextRound,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
