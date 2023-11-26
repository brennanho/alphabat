export type Player = {
  name: string;
  score: number;
  icon: any;
};

export interface Assets {
  images: {
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
  };
  animations: {
    timer: any;
    letterTile: any;
    board: any;
  };
}
