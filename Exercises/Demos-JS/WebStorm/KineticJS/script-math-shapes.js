(function () {
    var stage,
        layer,
        layerTrail,
        constants;

    stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: document.body.clientWidth,
        height: document.body.clientHeight
    });

    layerTrail = new Kinetic.Layer();
    layer = new Kinetic.Layer();

    constants = {
        BALLS: 1,
        BALL_X_INITIAL: 0,
        BALL_Y_INITIAL: 500,
        BALL_MIN_RADIUS: 15,
        BALL_MAX_RADIUS: 75,
        BALL_MIN_ANGLE: 0,
        BALL_MAX_ANGLE: 2 * Math.PI,
        BALL_MIN_SPEED: Math.PI * 0.01,
        BALL_MAX_SPEED: Math.PI * 0.1,
        BALL_FILL: getRandomColor(),
        BALL_STROKE: getRandomColor(),
        BALL_MOVE_X: 5,
        BALL_MOVE_Y: 7
    };

    function step() {
        layer.find('Circle')
            .forEach(function (ball) {
                ball.angle += ball.speed;

                if (ball.angle === 2 * Math.PI) {
                    ball.angle = 0;
                }

                moveCopy(ball);
                moveBall(ball);
            });

        layerTrail.draw();
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
            radius: getRandomNumber(constants.BALL_MIN_RADIUS, constants.BALL_MAX_RADIUS),
            fill: getRandomColor(),
            stroke: getRandomColor()
        });

        ball.angle = getRandomNumber(constants.BALL_MIN_ANGLE, constants.BALL_MAX_ANGLE);
        ball.speed = getRandomNumber(constants.BALL_MIN_SPEED, constants.BALL_MAX_SPEED);

        return ball;
    }

    function moveBall(ball) {
        var x = ball.getX() + constants.BALL_MOVE_X,
            y = ball.getY() + Math.cos(ball.angle) * constants.BALL_MOVE_Y;

        ball.setX(x);
        ball.setY(y);
        //ball.setFill(getRandomColor());
    }

    function moveCopy(ball) {
        var newBall = new Kinetic.Circle({
            x: ball.getX(),
            y: ball.getY(),
            radius: ball.getRadius(),
            fill: ball.getFill(),
            stroke: ball.getStroke()
        });

        layerTrail.add(newBall);
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

    stage.add(layerTrail);
    stage.add(layer);

    getBalls();

    return step();
} ());

