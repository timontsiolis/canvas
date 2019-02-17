var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

function Cricle(x, y, rad, dx, dy,color) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    
    this.draw = function () {
        c.beginPath();
        c.arc(this.x,this.y,this.rad,0,Math.PI*2,false);
        c.strokeStyle = this.color;
        c.stroke();
    };

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x >= window.innerWidth - this.rad || this.x <= this.rad) this.dx *= -1;
        if (this.y >= window.innerHeight - this.rad || this.y <= this.rad) this.dy *= -1;

        this.draw();
    };
}

var circleArray = [];

for (var i = 0; i < 50; i++) {
    var radius = 100*Math.random();
    var x = window.innerWidth/2-radius;
    var y = window.innerHeight/2-radius;
    var color = "rgba("
        +Math.random()*255+","
        +Math.random()*255+","+Math.random()*255+","
        +Math.random()+")";

    var dx =10*Math.random(), dy =10*Math.random();

    circleArray.push(new Cricle(x,y,radius,dx,dy,color));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    circleArray.forEach(function (l) {l.update()} );
}

animate();