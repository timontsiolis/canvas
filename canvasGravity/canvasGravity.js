var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var color = [
    "#112F41",
    "#068587",
    "#4FB99F",
    "#F2B134",
    "#ED553B"];

function Circle(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.color = color[Math.floor(Math.random()*color.length)];
    
    this.draw = function () {
        c.beginPath();
        c.arc(this.x,this.y,this.rad,0,Math.PI*2,false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    };

    this.update = function () {

        this.draw();
    };
}

var circleArray = [];

function init() {
    circleArray = [];

    for (var i = 0; i < 1; i++) {
        var radius = 10*Math.random()+10;
        var x = window.innerWidth/2-radius;
        var y = window.innerHeight/2-radius;

        circleArray.push(new Circle(x,y,radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    circleArray.forEach(function (l) {l.update()} );
}

init();
animate();