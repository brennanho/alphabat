import { Assets } from "@src/types";
import { Asset } from "expo-asset";

export const loadAssets = async (): Promise<Assets> => {
  return {
    images: {
      background: {
        main: await Asset.fromModule(
          require("./BG_Sizetest.png")
        ).downloadAsync(),
      },
      title: await Asset.fromModule(require('./AlphaBeatTitle_Sizetest.png')).downloadAsync(),
      textInput: await Asset.fromModule(
        require("./AlphaBeatINPUT_Sizetest.png")
      ).downloadAsync(),
      button: {
        default: await Asset.fromModule(
          require("./AlphaBeatPLAY_Sizetest.png")
        ).downloadAsync(),
        pause: {
          default: await Asset.fromModule(
            require("./pausebutton.png")
          ).downloadAsync(),
        },
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
      board: require("./DeadstateLineMoveTest.json"),
      letterTile: {
        unpressed: require("./DM_Tile_Unpressed_120x.json"),
        pressed: require("./DeadspaceMovementTest.json"),
        transition: require("./DiscoMammals_TileTRANSITION_UNPRESSED-PRESSED_Fancy.json"),
        contestable: require("./DM_Tile_Pressed_CHALLENGE.json"),
        radiate: require("./DiscoMammals_Tile_PRESSED_RadiateFX.json"),
      },
    },
  };
};

export const FONTS = {
  REGULAR: { NAME: "alphabat", SOURCE: require("./SimplyRoundedBold.ttf") },
};
