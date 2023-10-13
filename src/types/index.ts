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
    textInput: any;
    button: {
      default: any;
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
  };
}
