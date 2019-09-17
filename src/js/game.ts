import PlayScreen from "./screens/play";

class Game {
    public data: any;
    playScreen: PlayScreen;
    constructor() {
        this.data = {
            score : 666,
        };
    }
}

export default new Game();