export type Player = {
  name: string;
  lives: number;
  icon: any;
};

export interface Assets {
  images: {
    lives: any;
    background: {
      main: any;
    };
    title: any;
    textInput: any;
    button: {
      default: any;
      pause: any;
      letterTile: {
        default: any;
        contestable: any;
        pressed: any;
      };
    };
    characters: any[];
    speaker: any;
    beam: any;
  };
  animations: {
    timer: any;
    letterTile: any;
    board: any;
    title: any;
    titleBackground: any;
    beam: any;
    speaker: any;
    character: {
      life1: any;
      life2: any;
      life3: any;
    }
  };
}

export enum Device {
  IOS = "ios",
  Android = "android",
}
