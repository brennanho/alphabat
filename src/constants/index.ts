import shuffle from "shuffle-array";

export const CATEGORIES = shuffle([
  "Animals",
  "Fruits",
  "Colors",
  "Movies",
  "Countries",
  "Sports",
  "Musicians",
  "Food",
  "Transportation",
  "Emotions",
  "Jobs",
  "Hobbies",
  "Instruments",
  "Clothing",
  "Weather",
  "Plants",
  "Shapes",
  "Books",
  "Games",
  "Bodyparts",
  "Machines",
  "Heroes",
  "Vehicles",
  "Toys",
]);

export const MAX_PLAYERS = 8;
export const NUMBER_OF_CATEGORIES_TO_SELECT = 3;

export const SCREENS = {
  GAME: "Game",
  MAIN: "Main",
  CATEGORY_SELECTION: "CategorySelection",
};

export const APP_CONTEXT = {
  ACTIONS: {
    ADD_PLAYER: "ADD_PLAYER",
    REMOVE_PLAYER: "REMOVE_PLAYER",
    SET_NEXT_ROUND: "SET_NEXT_ROUND",
  },
};

export const STYLES = {
  ELEVATION: {
    elevation: 5, // Android
    shadowColor: "#000", // iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
};
