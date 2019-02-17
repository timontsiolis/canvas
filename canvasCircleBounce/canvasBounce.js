var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var radius = 100*Math.random();
var x = window.innerWidth/2-radius;
var y = window.innerHeight/2-radius;

var dx =10*Math.random(), dy =10*Math.random();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    c.beginPath();
    c.arc(x,y,radius,0,Math.PI*2,false);
    c.strokeStyle = "blue";
    c.stroke();

    x += dx;
    y += dy;
    if (x >= window.innerWidth - radius || x <= radius) dx *= -1;
    if (y >= window.innerHeight - radius || y <= radius) dy *= -1;
}

animate();