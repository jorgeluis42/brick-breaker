export default class InputHandler {
  constructor(paddle) {
    document.addEventListener("keydown", event => {
      const key = event.key;
      switch (key) {
        case "ArrowLeft":
          paddle.moveLeft();
          break;
        case "ArrowRight":
          paddle.moveRight();
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
