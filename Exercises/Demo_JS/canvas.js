var canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');

ctx.strokeStyle = "blue";
ctx.lineWidth = 100;

//ctx.strokeStyle = "red";
//ctx.strokeRect(145, 350, 5, 5);
//
//ctx.strokeStyle = "orange";
//ctx.strokeRect(650, 350, 5, 5);
//
//ctx.strokeStyle = "green";
//ctx.strokeRect(400, 5, 5, 5);
//
//ctx.strokeStyle = "blue";
//ctx.beginPath();
//ctx.moveTo(150, 350);
//ctx.quadraticCurveTo(400, 5, 650, 350);
//
//ctx.quadraticCurveTo(400, 900, 150, 350);
//ctx.stroke();
ctx.fillRect(50, 50, 145, 145);

ctx.scale(1, 1.5);

ctx.fillRect(100, 150, 145, 145);

ctx.scale(1, 1 / 1.5);

ctx.fillRect(300, 250, 145, 145);

var s1 = {
    x: 0,
    y: 0
};

var s2 = {
    x: canvas.width,
    y: 0
};

var i = 50;
var direction = true;

function changeDirection() {
    if (direction) {
        i += 15;

        if (i > canvas.width) {
            i = canvas.width;
            direction = false;
        }
    } else {
        i -= 15;

        if (i < 0) {
            i = 0;
            direction = true;
        }
    }
}

function draw(ctx, s1, s2, c) {
    ctx.beginPath();
    ctx.moveTo(s1.x, s1.y);
    ctx.quadraticCurveTo(c.x, c.y, s2.x, s2.y);
    ctx.stroke();
}

function animation() {
    var c = {
        x: i,
        y: canvas.height
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    changeDirection();

    draw(ctx, s1, s2, c);
    requestAnimationFrame(animation);
    //setTimeout(animation, 200);
}

function dynamicRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.strokeRect(i, 100, 50, 50);
    ctx.beginPath();
    ctx.arc(i, i / 2, 10, 0, 2 * Math.PI);
    ctx.stroke();

    changeDirection();

    requestAnimationFrame(dynamicRect);
}

//animation();

//dynamicRect();