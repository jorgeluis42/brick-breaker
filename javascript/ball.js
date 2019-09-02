export default class Ball {
constructor(game){
    this.image = document.getElementById("ball_img");

    this.gamewidth = game.gamewidth;
    this.gameheight = game.gameheight;

    this.game = game;
    this.position = {x:10, y:10};
    this.speed = {x:2, y:2};
    this.size =80;
}


draw(ctx){
    ctx.drawImage(this.image,this.position.x,this.position.y, this.size, this.size
        );
}


update(deltaTime){
this.position.x += this.speed.x;
this.position.y += this.speed.y;

if (this.position.x + this.size > this.gamewidth || this.position.x < 0) {
    this.speed.x = -this.speed.x;
}
if (this.position.y + this.size > this.gameheight || this.position.y < 0) {
    this.speed.y = -this.speed.y;
}
let bottomOfBall = this.position.y + this.size;
let topOfPaddle = this.game.paddle.position.y;

if (bottomOfBall >= topOfPaddle){
    this.speed.y = -this.speed.y;
    this.position.y = this.game.paddle.position.y - this.size;
}
}
}