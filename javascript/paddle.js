export default class Paddle {
    constructor(game){
        this.gamewidth = game.gamewidth;
        this.width = 150;
        this.height = 20;
        this.speed = 0;
        this.maxSpeed = 7;
        this.position= {
            x: game.gamewidth / 2 - this.width /2,
            y: game.gameheight - this.height - 10
        };
    }


draw(ctx){
    ctx.fillStyle = "orange";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    
    
}
moveLeft(){
    this.speed = -this.maxSpeed;
}
moveRight(){
    this.speed = this.maxSpeed;
}
stop(){
    this.speed = 0;
}
update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;

    if (this.position.x + this.width > this.gamewidth)
      this.position.x = this.gamewidth - this.width;
  }
}
