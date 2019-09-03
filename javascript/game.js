import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js"
import Brick from "./brick.js"
import {buildLevel, level1, level2} from "./levels.js"

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}
export default class Game {
    constructor(gamewidth, gameheight){
        this.gamewidth = gamewidth;
        this.gameheight = gameheight;
        this.gamestate = GAMESTATE.MENU;
        this.ball = new Ball(this);
         this.paddle = new Paddle(this);
         this.gameObjects = [];
         this.bricks = [];
         this.lives = 1;

         this.levels = [level1, level2];
         this.currentlevel = 0;
new InputHandler(this.paddle, this);
    }
    start(){
       if(this.gamestate !== GAMESTATE.MENU && this.gamestate != GAMESTATE.NEWLEVEL)
       return;

     this.bricks = buildLevel(this, this.levels[this.currentlevel]);
      
         
this.ball.reset()
 this.gameObjects = [this.ball, this.paddle];

this.gamestate = GAMESTATE.RUNNING;


    }
    update(deltaTime){
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER
        if(this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;

        if(this.bricks.length === 0){
            this.currentlevel ++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }
       [...this.gameObjects, ...this.bricks] 
        .forEach(object => object.update(deltaTime));
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion )
    }
    draw(ctx){
       [...this.gameObjects,...this.bricks].forEach(object => object.draw(ctx));
if(this.gamestate === GAMESTATE.PAUSED){
    var pauseimg = document.getElementById("paused_img");
        var pat = ctx.createPattern(pauseimg, "no-repeat");
    ctx.rect(1,1, this.gamewidth, this.gameheight)
    ;
    ctx.fillStyle = pat;
    ctx.fill();
    
    }
    if(this.gamestate === GAMESTATE.MENU){
        var startimg = document.getElementById("start_img");
        var start = ctx.createPattern(startimg, "repeat");
    ctx.rect(1, 1, this.gamewidth, this.gameheight);
    ctx.fillStyle = start;
    ctx.fill();
     }
     if(this.gamestate === GAMESTATE.GAMEOVER){
        var overimg = document.getElementById("gameover_img");
        var over = ctx.createPattern(overimg, "repeat");
    ctx.rect(1, 1, this.gamewidth,this.gameheight);
    ctx.fillStyle = over;
    ctx.fill();
     
        ctx.font = "30px Times New Roman";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText("🐰GAMEOVER🐰", this.gamewidth / 3, this.gameheight /2)
     }
}

    togglePause(){
if(this.gamestate == GAMESTATE.PAUSED){
    this.gamestate = GAMESTATE.RUNNING;
} else {
    this.gamestate = GAMESTATE.PAUSED;
}
    }
}