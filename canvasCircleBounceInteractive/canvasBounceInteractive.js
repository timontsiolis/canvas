var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var maxRadius = 40;
var velocity = 3;

var color = [
    "#112F41",
    "#068587",
    "#4FB99F",
    "#F2B134",
    "#ED553B"];

var mouse = {
    x: undefined,
    y: undefined};

window.addEventListener('mousemove',function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function Circle(x, y, rad, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.minRad = rad;
    this.dx = dx;
    this.dy = dy;
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
        this.x += this.dx*velocity;
        this.y += this.dy*velocity;
        if (this.x >= window.innerWidth - this.rad || this.x <= this.rad) this.dx *= -1;
        if (this.y >= window.innerHeight - this.rad || this.y <= this.rad) this.dy *= -1;

        var dist = 50;

        if (mouse.x - this.x < dist && mouse.x - this.x > - dist
        && mouse.y - this.y < dist && mouse.y - this.y > -dist
        && this.rad <= maxRadius){
            this.rad++;
        }else if(this.rad > this.minRad){
            this.rad--;
        }

        this.draw();
    };
}

var circleArray = [];

for (var i = 0; i < 800; i++) {
    var radius = 10*Math.random()+10;
    var x = window.innerWidth/2-radius;
    var y = window.innerHeight/2-radius;

    var dx = Math.random()-0.5,
        dy = Math.random()-0.5;

    circleArray.push(new Circle(x,y,radius,dx,dy,color));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    circleArray.forEach(function (l) {l.update()} );
}

animate();