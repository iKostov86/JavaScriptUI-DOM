var canvas = document.getElementById('the-canvas');
var ctx = canvas.getContext('2d');

//head
ctx.lineWidth = 7;
ctx.fillStyle = "#90CAD7";
ctx.strokeStyle = "#22545F";

//draw head
ctx.beginPath();
ctx.arc(250, 600, 200, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();

//draw mouth
ctx.save();
ctx.beginPath();
ctx.rotate((Math.PI/180) * 10);
ctx.scale(1, 0.35);
ctx.arc(310, 670 / 0.35, 80, 0, 2 * Math.PI);
ctx.restore();
ctx.stroke();

//draw nose
ctx.beginPath();
ctx.moveTo(210, 540);
ctx.lineTo(160, 640);
ctx.moveTo(160,640);
ctx.lineTo(210, 640);
ctx.stroke();

//draw eyes
ctx.save();
ctx.scale(1, 0.65);
ctx.beginPath();
ctx.arc(130, 530 / 0.65, 35, 0, 2 * Math.PI);
ctx.restore();
ctx.stroke();

ctx.save();
ctx.scale(1, 0.65);
ctx.beginPath();
ctx.arc(280, 530 / 0.65, 35, 0, 2 * Math.PI);
ctx.restore();
ctx.stroke();

ctx.fillStyle = "#22545F";

ctx.save();
ctx.scale(0.55, 1);
ctx.beginPath();
ctx.arc(115 / 0.55, 530, 17, 0, 2 * Math.PI);
ctx.restore();
ctx.fill();

ctx.save();
ctx.scale(0.55, 1);
ctx.beginPath();
ctx.arc(265 / 0.55, 530, 17, 0, 2 * Math.PI);
ctx.restore();
ctx.fill();

//draw hat
ctx.fillStyle = "#396693";
ctx.strokeStyle = "#262626";

ctx.beginPath();
ctx.moveTo(130, 370);
ctx.lineTo(130, 170);
ctx.lineTo(370, 170);
ctx.lineTo(370, 370);
ctx.fill();
ctx.stroke();

ctx.save();
ctx.scale(1, 0.25);
ctx.beginPath();
ctx.arc(230, 420 / 0.25, 230, 109 * Math.PI / 64, 87 * Math.PI / 64);
ctx.restore();

ctx.save();
ctx.scale(1, 0.5);
ctx.moveTo(370, 370 / 0.5);
ctx.arc(250, 370 / 0.5, 120, 0, 32 * Math.PI / 31);
ctx.restore();

ctx.save();
ctx.scale(1, 0.4);
ctx.moveTo(370, 170 / 0.4);
ctx.arc(250, 170 / 0.4, 120, 0, 2 * Math.PI);
ctx.restore();

ctx.fill();
ctx.stroke();

//bicycle
ctx.lineWidth = 4;
ctx.fillStyle = "#90CAD7";
ctx.strokeStyle = "#22545F";

//draw wheels, frame
ctx.beginPath();

//rear wheel
ctx.arc(570, 700, 90, 0, 2 * Math.PI);

//front wheel
ctx.moveTo(960, 700);
ctx.arc(870, 700, 90, 0, 2 * Math.PI);

ctx.fill();

//pedals
ctx.moveTo(680, 660);
ctx.lineTo(700, 680);
ctx.moveTo(740, 720);
ctx.lineTo(760, 740);

//middle wheel
ctx.moveTo(750, 700);
ctx.arc(720, 700, 30, 0, 2 * Math.PI);

//middle frame
ctx.moveTo(570, 700);
ctx.lineTo(650, 570);
ctx.lineTo(850, 570);
ctx.lineTo(720, 700);
ctx.lineTo(570, 700);

//front frame
ctx.moveTo(870, 700);
ctx.lineTo(845, 500);
ctx.lineTo(890, 440);
ctx.moveTo(845, 500);
ctx.lineTo(770, 530);

//rear frame
ctx.moveTo(720, 700);
ctx.lineTo(620, 530);
ctx.moveTo(580, 530);
ctx.lineTo(660, 530);

ctx.stroke();
