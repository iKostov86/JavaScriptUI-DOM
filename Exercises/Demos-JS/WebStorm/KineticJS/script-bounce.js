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
        BALL_X_INITIAL: 0,
        BALL_Y_INITIAL: 0,
        BALL_RADIUS_INITIAL: 25,
        BALL_DELTA_X: 1,
        BALL_DELTA_Y: 1,
        BALL_SPEED_X: 3,
        BALL_SPEED_Y: 7,
        BALL_ACCELERATION: 0.01,
        BALL_DECELERATION: 0.01,
        BALL_TIME: 1
    };

    function step() {
        layer.find('Circle')
            .forEach(function (ball) {
                if (ball.deltaX === 1 && ball.getX() >= stage.getWidth() - ball.getRadius()) {
                    ball.deltaX = -1;
                } else if (ball.deltaX === -1 && ball.getX() <= 0 + ball.getRadius()) {
                    ball.deltaX = 1;
                }

                if (ball.deltaY === 1 && ball.getY() >= stage.getHeight() - ball.getRadius()) {
                    ball.deltaY = -1;
                    ball.time = constants.BALL_TIME;
                } else if (ball.deltaY === -1 && (ball.getY() <= 0 + ball.getRadius() || ball.speed <= 0)) {
                    ball.deltaY = 1;
                    ball.time = constants.BALL_TIME;
                }

                if (ball.getY() >= stage.getHeight() - ball.getRadius() && ball.speed <= 0) {
                    ball.setY(stage.getHeight() - ball.getRadius());
                    layerBG.add(ball);
                    layerBG.draw();
                } else {
                    moveBall(ball);
                    ball.time += 1;
                }
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
            x: constants.BALL_X_INITIAL,
            y: constants.BALL_Y_INITIAL,
            radius: constants.BALL_RADIUS_INITIAL,
            fill: getRandomColor(),
            stroke: getRandomColor()
        });

        ball.deltaX = constants.BALL_DELTA_X;
        ball.deltaY = constants.BALL_DELTA_Y;
        ball.speedX = constants.BALL_SPEED_X;
        ball.speedY = constants.BALL_SPEED_Y;
        ball.time = constants.BALL_TIME;

        return ball;
    }

    function moveBall(ball) {
        if (ball.deltaY === 1) {
            ball.speedY += constants.BALL_ACCELERATION * ball.time;
        } else {
            ball.speedY -= constants.BALL_DECELERATION * ball.time;
        }

        ball.setX(ball.getX() + ball.deltaX * ball.speedX);
        ball.setY(ball.getY() + ball.deltaY * ball.speedY);
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

    getBalls();

    return step();
}());