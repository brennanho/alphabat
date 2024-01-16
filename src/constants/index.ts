import shuffle from "shuffle-array";

export const CATEGORIES = shuffle([
  "Animals",
  "Fruits",
  "Colors",
  "Movies",
  "Countries",
  "Olympic Sports",
  "Musicians",
  "Internet Celebrities",
  "Transportation",
  "Emotions",
  "Jobs",
  "Instruments",
  "Clothing Brands",
  "Plants",
  "Books",
  "Vehicles",
  "Japanese Food",
  "Disney Characters",
  "Nickelodeon Characters",
  "Animes",
  "Cocktails",
  "Fast Food Chain",
  "Candies",
  "Dog Breeds",
  "World Capitals",
  "Insects",
  "Periodic Table Elements",
  "Programming Languages"
]);

export const MAX_PLAYERS = 4;
export const NUMBER_OF_CATEGORIES_TO_SELECT = 3;
export const SCORE_TO_WIN = 3;
export const TOTAL_LETTER_COUNT = 24;

export const SCREENS = {
  GAME: "Game",
  main: "Main",
  CATEGORY_SELECTION: "CategorySelection",
};

export const APP_CONTEXT = {
  ACTIONS: {
    ADD_PLAYER: "ADD_PLAYER",
    REMOVE_PLAYER: "REMOVE_PLAYER",
    SET_NEXT_ROUND: "SET_NEXT_ROUND",
    RESET_GAME: "RESET_GAME"
  },
};

export const STYLES = {
  ELEVATION: {
    // ios
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    // android
    elevation: 24, 
  },
  TEXT_COLOR: "white",
  TEXT_COLOR_WHITE: "white",
  TEXT_COLOR_PLACEHOLDER: "#6547e7"
};

