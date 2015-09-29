(function () {
    var stage,
        layer,
        layerBG,
        constants;

    stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: document.body.clientWidth,
        height: document.body.clientHeight
    });

    layer = new Kinetic.Layer();
    layerBG = new Kinetic.Layer();

    constants = {
        BALLS: 1,
        BALL_MIN_X: 0,
        BALL_MAX_X:stage.getWidth(),
        BALL_MIN_Y: 0,
        BALL_MAX_Y:stage.getHeight(),
        BALL_MIN_RADIUS: 15,
        BALL_MAX_RADIUS: 45,
        BALL_MIN_MOVE_X: 2,
        BALL_MAX_MOVE_X: 6,
        BALL_MIN_MOVE_Y: 4,
        BALL_MAX_MOVE_Y: 8,
        BALL_MIN_ACCELERATION: 0.11,
        BALL_MAX_ACCELERATION: 0.99,
        BALL_MIN_DECELERATION_DIFFERENCE: 0.01,
        BALL_MAX_DECELERATION_DIFFERENCE: 0.02
    };

    function start() {
        getBalls();
        step();
    }

    function step() {
        var balls = layer.find('Circle');

        balls.forEach(function (ball) {
            if (ball.deltaX === 1 && ball.getX() >= stage.getWidth() - ball.getRadius()) {
                ball.deltaX = -1;
            } else if (ball.deltaX === -1 && ball.getX() <= 0 + ball.getRadius()) {
                ball.deltaX = 1;
            }

            if (ball.deltaY === 1) {
                if (ball.getY() >= stage.getHeight() - ball.getRadius()) {
                    ball.deltaY = -1;
                }
            } else {
                if (ball.getY() <= 0 + ball.getRadius()) {
                    ball.deltaY = 1;
                } else if (ball.getY() >= stage.getHeight() - ball.getRadius() && ball.speedY <= 0) {
                    ball.setY(stage.getHeight() - ball.getRadius());
                    layerBG.add(ball);
                    layerBG.draw();
                } else if (ball.speedY <= 0) {
                    ball.deltaY = 1;
                    ball.speedY = 0;
                }
            }

            moveBall(ball);
        });

        layer.draw();

        //setTimeout(step, 100);
        requestAnimationFrame(step);
    }

    function getBalls() {
        for (var i = 0; i < constants.BALLS; i += 1) {
            layer.add(getBall());
        }
    }

    function getBall() {
        var ball = new Kinetic.Circle({
            x: getRandomNumber(constants.BALL_MIN_X, constants.BALL_MAX_X),
            y: getRandomNumber(constants.BALL_MIN_Y, constants.BALL_MAX_Y),
            radius: getRandomNumber(constants.BALL_MIN_RADIUS, constants.BALL_MAX_RADIUS),
            fill: getRandomColor(),
            //stroke: getRandomColor()
        });

        ball.deltaX = getRandomDirection();
        ball.deltaY = getRandomDirection();
        ball.speedX = getRandomNumber(constants.BALL_MIN_MOVE_X, constants.BALL_MAX_MOVE_X);
        ball.speedY = getRandomNumber(constants.BALL_MIN_MOVE_Y, constants.BALL_MAX_MOVE_Y);
        ball.acceleration = getRandomNumber(constants.BALL_MIN_ACCELERATION, constants.BALL_MAX_ACCELERATION);
        ball.deceleration = ball.acceleration +
            getRandomNumber(constants.BALL_MIN_DECELERATION_DIFFERENCE,constants.BALL_MAX_DECELERATION_DIFFERENCE);

        return ball;
    }

    function moveBall(ball) {
        if (ball.deltaY === 1) {
            ball.speedY += ball.acceleration;
        } else {
            ball.speedY -= ball.deceleration;
        }

        ball.setX(ball.getX() + ball.deltaX * ball.speedX);
        ball.setY(ball.getY() + ball.deltaY * ball.speedY);
    }

    function getRandomDirection() {
        return getRandomNumber(0, 1) > 0.5 ? 1 : -1;
    }

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
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

    stage.add(layerBG);
    stage.add(layer);

    return start();
}());