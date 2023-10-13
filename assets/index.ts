import { Asset } from "expo-asset";

export const loadAssets = async () => {
  return {
    images: {
      background: {
        main: await Asset.fromModule(
          require("./junglebg1.jpg")
        ).downloadAsync(),
      },
      textInput: await Asset.fromModule(
        require("./text_input.png")
      ).downloadAsync(),
      button: {
        default: await Asset.fromModule(
          require("./button7.png")
        ).downloadAsync(),
        letterTile: {
          default: await Asset.fromModule(
            require("./LetterBlock2.png")
          ).downloadAsync(),
          contestable: await Asset.fromModule(
            require("./GREEN_O.png")
          ).downloadAsync(),
          pressed: await Asset.fromModule(
            require("./RED_O.png")
          ).downloadAsync(),
        },
      },
      characters: [
        await Asset.fromModule(require("./BUNBO.png")).downloadAsync(),
        await Asset.fromModule(require("./BatJohn.png")).downloadAsync(),
        await Asset.fromModule(require("./Catfred.png")).downloadAsync(),
        await Asset.fromModule(require("./Blindguy.png")).downloadAsync(),
        await Asset.fromModule(require("./COOLALA.png")).downloadAsync(),
        await Asset.fromModule(require("./Doggone.png")).downloadAsync(),
        await Asset.fromModule(require("./Dogkapn.png")).downloadAsync(),
        await Asset.fromModule(require("./SaltyMammals.png")).downloadAsync(),
      ],
    },
    animations: {
      timer: require("./bomb_timer_1.json"),
    },
  };
};

export const FONTS = {
  REGULAR: { NAME: "alphabat", SOURCE: require("./SimplyRounded.ttf") },
  BOLD: { NAME: "alphabet-bold", SOURCE: require("./SimplyRoundedBold.ttf") },
};
