var module = (function() {
    var canvas = document.getElementById('the-canvas'),
        ctx = canvas.getContext('2d'),
        constants = {
            CONST_RADIUS: 100,
            CONST_MOVES: 10,
            CONST_REPEATS: 30,
            CONST_BALLS: 36
        },
        balls = getBalls();

    canvas.width = window.innerWidth * 0.995;
    canvas.height = window.innerHeight * 0.99;

    function animationAllBalls() {
        //var balls = getBalls();
        //checkRepeats(balls[getRandomNumber(0, balls.length)]);
        var i;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < balls.length; i += 1) {
            moveBall(balls[i]);
            checkBoundaries(balls[i]);
            //checkIfCrash(balls[i]);
            drawBall(balls[i]);
        }

        requestAnimationFrame(animationAllBalls);
    }

    function animationOneBall() {
        //var ball = getBall();
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        checkRepeats(balls[0])
        moveBall(balls[0]);
        checkBoundaries(balls[0]);
        drawBall(balls[0]);

        requestAnimationFrame(animationOneBall);
    }

    function moveBall(ball) {
        if (ball.direction.right) {
            ball.current.x += ball.move.x;
        } else {
            ball.current.x -= ball.move.x;
        }

        if (ball.direction.down) {
            ball.current.y += ball.move.y;
        } else {
            ball.current.y -= ball.move.y;
        }
    }

    function checkBoundaries(ball) {
        if (ball.current.x >= canvas.width - ball.radius) {
            ball.current.x = canvas.width - ball.radius;
            ball.direction.right = false;
        } else if (ball.current.x <= ball.radius) {
            ball.current.x = ball.radius;
            ball.direction.right = true;
        }

        if (ball.current.y >= canvas.height - ball.radius) {
            ball.current.y = canvas.height - ball.radius;
            ball.direction.down = false;
        } else if (ball.current.y <= ball.radius) {
            ball.current.y = ball.radius;
            ball.direction.down = true;
        }
    }

    function checkIfCrash(ball) {
        var d,
            i,
            length,
            temp;

        for (i = 0, length = balls.length; i < length; i += 1) {
            if (ball !== balls[i]) {
                d = Math.sqrt((ball.current.x - balls[i].current.x) * (ball.current.x - balls[i].current.x)
                    + (ball.current.y - balls[i].current.y) * (ball.current.y - balls[i].current.y));

                if (d <= ball.radius + balls[i].radius) {
                    if (ball.direction.right === balls[i].direction.right &&
                        ball.direction.down === balls[i].direction.down) {
                        temp = ball.move.x;
                        ball.move.x = ball.move.y;
                        ball.move.y = temp;

                        temp = balls[i].move.x;
                        balls[i].move.x = balls[i].move.y;
                        balls[i].move.y = temp;
                    }

                    if (ball.direction.right !== balls[i].direction.right) {
                        ball.direction.right = !ball.direction.right;
                        balls[i].direction.right = !balls[i].direction.right;
                    }

                    if (ball.direction.down !== balls[i].direction.down) {
                        ball.direction.down = !ball.direction.down;
                        balls[i].direction.down = !balls[i].direction.down;
                    }
                }
            }
        }
    }

    function checkRepeats(ball) {
        ball.current.countRepeats -= 1;

        if (ball.current.countRepeats === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ball.current.countRepeats = ball.start.countRepeats;
        }
    }

    function drawBall(ball, color) {
        ctx.fillStyle = color || ball.color;
        ctx.beginPath();
        ctx.arc(ball.current.x, ball.current.y, ball.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    function getBalls() {
        var balls = [];

        for (var i = 0; i < constants.CONST_BALLS; i += 1) {
            balls[i] = getBall();
        }

        return balls;
    }

    function getBall() {
        var ball = {
            radius: getRandomNumber(1, constants.CONST_RADIUS),
            color: getRandomColor(),
            start: {
                x: getRandomNumber(0, canvas.width),
                y: getRandomNumber(0, canvas.height),
                countRepeats: getRandomNumber(1, constants.CONST_REPEATS),
            },
            move: {
                x: getRandomNumber(1, constants.CONST_MOVES),
                y: getRandomNumber(1, constants.CONST_MOVES)
            },
            direction: {
                right: getRandomDirection(),
                down: getRandomDirection()
            }
        };

        ball.current = {
            x: ball.start.x,
            y: ball.start.y,
            countRepeats: ball.start.countRepeats
        }

        return ball;
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomDirection() {
        var number = getRandomNumber(0, 1);

        return number > 0.5 ? true : false;
    }

    function getRandomColor() {
        const COLOR_STRING_LENGTH = 6;
        const HEXADECIMAL_BASE = 16;
        const HEXADECIMAL_SIGNS = '0123456789ABCDEF';

        var letters = HEXADECIMAL_SIGNS.split('');
        var color = '#';
        for (var i = 0; i < COLOR_STRING_LENGTH; i += 1) {
            color += letters[Math.floor(Math.random() * HEXADECIMAL_BASE)];
        }
        return color;
    }

    return animationAllBalls();
    //return animationOneBall();
}());

console.log(module);