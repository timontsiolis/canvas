var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var player;
var friction = 0.1;
var boxCount = 4;
var score = 0;
var game = false;

var color = [
    "#112F41",
    "#068587",
    "#4FB99F",
    "#F2B134",
    "#ED553B"];

window.addEventListener('keydown',function (ev) {
    if (ev.keyCode === 32) {
        if (game) player.dy = -20;
    } else if (ev.keyCode === 13) {
        init();
    }
});

function Box(x) {
    this.color = color[Math.floor(Math.random()*color.length)];
    this.x = canvas.width+x;
    this.bottom = canvas.height/4+Math.random()*canvas.height/4;
    this.top = canvas.height-this.bottom-250;

    this.dx = 10;

    this.draw = function () {
        c.beginPath();
        c.fillRect(this.x,canvas.height-this.bottom,50,this.bottom);
        c.fillRect(this.x,0,50,this.top);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    };

    this.update = function () {
        this.x -= this.dx;

        if (this.x+50+this.dx < 0){
            this.x = canvas.width;
            this.bottom = canvas.height/4+Math.random()*canvas.height/8;
            this.top = canvas.height-this.bottom-200;
            score++;
        }

        if (player.y+30 > canvas.height- this.bottom || player.y-30 < this.top) {
            if (player.x > this.x && player.x+30 < this.x+50) {
                game = false;
           }
        }

        this.draw();
    }
}

function Circle(x, y, dx, dy, rad) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.color = color[Math.floor(Math.random()*color.length)];
    
    this.draw = function () {
        c.beginPath();
        c.arc(this.x,this.y,this.rad,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    };

    this.update = function () {

        if (this.y+this.rad + this.dy > canvas.height || this.y-this.rad + this.dy < 0) {
            game = !game;
        }else{
            this.dy++;
        }

        if(this.x +this.rad+this.dx >= canvas.width || this.x -this.rad+this.dx <= 0 ){
            this.dx *= -friction;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
}

var boxArray = [];

function init() {
    game = true;
    score = 0;
    boxArray = [];

    player  = new Circle(canvas.width*0.2,canvas.height*0.4,0,0,30);

    for (var j = 0; j < boxCount; j++) {
        boxArray.push(new Box(canvas.width/boxCount*j));
    }
}

function animate() {

    requestAnimationFrame(animate);
    console.log(game);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (game) {
        player.update();
        boxArray.forEach(function (l) {l.update()});
        c.fillText("score: " + score, 50, 50);
    }else {
        c.font = " 30px Arial";
        c.fillText("your score: " + score, 50, canvas.height / 2);
        c.fillText("press Enter to start", 50, canvas.height / 2+40);
    }
}
animate();
