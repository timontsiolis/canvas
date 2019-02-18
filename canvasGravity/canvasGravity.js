var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var friction = 0.8;

var color = [
    "#112F41",
    "#068587",
    "#4FB99F",
    "#F2B134",
    "#ED553B"];

window.addEventListener('click',function () {
    circleArray.forEach(function (value) {
        value.dx = (Math.random()-0.5)*20;
        value.dy = -20*Math.random()-10;})
});

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

        if (this.y+this.rad + this.dy > canvas.height) {
            this.dy *= -friction;
            this.dx *= friction;
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

var circleArray = [];

function init() {
    circleArray = [];

    for (var i = 0; i < 100; i++) {
        var radius = 10*Math.random()+10;
        var x = Math.random()*(canvas.width-radius)+radius;
        var y = window.innerHeight/2-radius-Math.random()*200;
        var dx = 20*(Math.random()-0.5);

        circleArray.push(new Circle(x,y,dx,0,radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    circleArray.forEach(function (l) {l.update()} );
}

init();
animate();