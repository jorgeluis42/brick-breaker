import Game from "./game.js";

export default class InputHandler {
  constructor(paddle, Game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;
        case 39:
          paddle.moveRight();
          break;
          case 27:
            Game.togglePause();
            break;
            case 32:
              Game.start();
              break;
      }
    });
    document.addEventListener("keyup", event => {
        const key = event.key;
        switch (key) {
          case "ArrowLeft":
            paddle.stop();
            break;
          case "ArrowRight":
            paddle.stop();
            break;
        }
      });
  }
}
