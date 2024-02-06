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
        await Asset.fromModule(require("./SaltyMammals.png")).downloadAsync(),
        await Asset.fromModule(require("./DEAD.png")).downloadAsync(),
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
      timer: require("./Timer.json"),
      letterTile: {
        unpressed: require("./LetterTileUnpressed.json"),
        pressed: require("./LetterTilePressed.json"),
        transition: require("./LetterTileTransition.json"),
        contestable: require("./LetterTileContestable.json"),
      },
      title: require("./AlphaBeatTitle.json"),
      beam: require("./UltraLightBeam.json"),
      speaker: require("./Speaker.json")
    },
  };
};

export const FONTS = {
  REGULAR: { NAME: "alphabat", SOURCE: require("./SimplyRoundedBold.ttf") },
};
