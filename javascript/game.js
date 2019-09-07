import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js"
import Brick from "./brick.js"
import { buildLevel, level1, level2 } from "./levels.js"

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    GAMEWON: 5,
    
}
export default class Game {
    constructor(gamewidth, gameheight) {
        this.gamewidth = gamewidth;
        this.gameheight = gameheight;
        this.gamestate = GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 3;
        this.score = 0

        this.levels = [level1, level2];
        this.currentlevel = 0;

        new InputHandler(this.paddle, this);
    }
    start() {
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate != GAMESTATE.NEWLEVEL)
            return;

        this.bricks = buildLevel(this, this.levels[this.currentlevel]);


        this.ball.reset()
        this.gameObjects = [this.ball, this.paddle];

        this.gamestate = GAMESTATE.RUNNING;


    }
    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER || this.gamestate=== GAMESTATE.GAMEWON) return;

        if (this.bricks.length === 0 && this.currentlevel === 0 ) {
            this.currentlevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        } else if (this.bricks.length === 0 && this.currentlevel === 1 ) {
            this.gamestate = GAMESTATE.GAMEWON
        }
        [...this.gameObjects, ...this.bricks]
            .forEach(object => object.update(deltaTime));
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion)
        document.getElementById('livesLeft').innerHTML = 'Lives Left: ' + this.lives
        if(this.bricks.filter(brick => brick.markedForDeletion)){
            this.score++
            document.getElementById('score').innerHTML = 'Score: ' + this.score
          }
    }
    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
        if (this.gamestate === GAMESTATE.PAUSED) {
            var pauseimg = document.getElementById("paused_img");
            var pat = ctx.createPattern(pauseimg, "no-repeat");
            ctx.rect(1, 1, this.gamewidth, this.gameheight)
                ;
            ctx.fillStyle = pat;
            ctx.fill();

        }
        if (this.gamestate === GAMESTATE.MENU) {
            var startimg = document.getElementById("start_img");
            var start = ctx.createPattern(startimg, "repeat");
            ctx.rect(0, 0, this.gamewidth, this.gameheight);
            ctx.fillStyle = start;
            ctx.fill();
        }
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            var overimg = document.getElementById("gameover_img");
            var over = ctx.createPattern(overimg, "repeat");
            ctx.rect(0, 0, this.gamewidth, this.gameheight);
            ctx.fillStyle = over;
            ctx.fill();
            ctx.font = "30px Times New Roman";
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.fillText("🐰GAMEOVER🐰", this.gamewidth / 3, this.gameheight / 2)
            document.getElementById('playAgain').style.display = "block"
        }
        if(this.gamestate === GAMESTATE.GAMEWON ){
            var wonimg = document.getElementById("win_img");
            var won = ctx.createPattern(wonimg, "repeat");
            ctx.rect(0, 0, this.gamewidth, this.gameheight);
            ctx.fillStyle = won;
            ctx.fill();
            ctx.font = "50px Times New Roman";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText("🐰GAMEWON🐰", this.gamewidth / 4, this.gameheight / 2)
            document.getElementById('playAgain').style.display = "block"
        }
    }

    togglePause() {
        document.getElementById("myAudio").pause();
        document.getElementById("myAudio1").play();
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
            document.getElementById("myAudio1").pause();
            document.getElementById("myAudio").play();
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}