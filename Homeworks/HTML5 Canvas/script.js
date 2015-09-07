var canvas = document.getElementById('the-canvas');
var ctx = canvas.getContext('2d');

ctx.lineWidth = 1;
ctx.fillStyle = "#90CAD7";
ctx.strokeStyle = "#22545F";
ctx.beginPath();
ctx.arc(50, 50, 30, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();
ctx.beginPath();
ctx.arc(45, 60, 5, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();
