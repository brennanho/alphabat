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
  };
}
