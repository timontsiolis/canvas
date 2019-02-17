var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

for (var x = 1; x <= 10000; x++) {
    c.beginPath();
    c.strokeStyle = "rgba("
        +Math.random()*255+","
        +Math.random()*255+","+Math.random()*255+","
        +Math.random()+")";
    c.arc(Math.random()*window.innerWidth,Math.random()*window.innerHeight,50,0,Math.PI*2,false);
    c.stroke();
}