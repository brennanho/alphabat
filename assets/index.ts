import { Assets } from "@src/types";
import { Asset } from "expo-asset";

export const loadAssets = async (): Promise<any> => {
  return {
    images: {
      background: {
        main: await Asset.fromModule(
          require("./BG_Sizetest.png")
        ).downloadAsync(),
      },
      title: await Asset.fromModule(
        require("./AlphaBeatTitle_Sizetest.png")
      ).downloadAsync(),
      textInput: await Asset.fromModule(
        require("./InputSizeTest.png")
      ).downloadAsync(),
      button: {
        default: await Asset.fromModule(
          require("./PlayButtonSizetest.png")
        ).downloadAsync(),
        pause: {
          default: await Asset.fromModule(
            require("./pausebutton.png")
          ).downloadAsync(),
        },
      },
      speaker: await Asset.fromModule(require("./speaker.png")).downloadAsync(),
      beam: await Asset.fromModule(
        require("./LightBeamSizeTest.png")
      ).downloadAsync(),
      characters: [
        await Asset.fromModule(
          require("./AngryRed_Monster.png")
        ).downloadAsync(),
        await Asset.fromModule(
          require("./BlueTriEye_Monster.png")
        ).downloadAsync(),
        await Asset.fromModule(
          require("./GreenGlasses_Monster.png")
        ).downloadAsync(),
        await Asset.fromModule(
          require("./YellowCyclops_Monster.png")
        ).downloadAsync(),
      ],
      lives: {
        zero: await Asset.fromModule(require("./DEAD.png")).downloadAsync(),
        one: await Asset.fromModule(require("./LIFE_1.png")).downloadAsync(),
        two: await Asset.fromModule(require("./LIFE_2.png")).downloadAsync(),
        three: await Asset.fromModule(
          require("./LIFE_MAX.png")
        ).downloadAsync(),
      },
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
