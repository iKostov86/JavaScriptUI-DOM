(function () {
    var stage,
        layer,
        layerOrbit,
        constants;

    stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: document.body.clientWidth,
        height: document.body.clientHeight
    });

    layerOrbit = new Kinetic.Layer();
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
        PATH_X_INITIAL: stage.getWidth() / 2,
        PATH_Y_INITIAL: stage.getHeight() / 2,
        PATH_RADIUS_INITIAL: 50,
        PATH_MOVE_X: 0.1,
        PATH_MOVE_Y: 0.1,
        PATH_MOVE_RADIUS: 0.2,
        PATH_STROKE: 'black',
        PATH_STROKE_WIDTH: 15
    };

    function step() {
        var path = layerOrbit.find('Circle')[0];

        layer.find('Circle')
            .forEach(function (ball) {
                ball.angle += ball.speed;

                if (ball.angle === 2 * Math.PI) {
                    ball.angle = 0;
                }

                moveBall(ball, path);
                moveCopy(ball);
                movePath(path);
            });

        layerOrbit.draw();
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

    function getPath() {
        var path = new Kinetic.Circle({
            x: constants.PATH_X_INITIAL,
            y: constants.PATH_Y_INITIAL,
            radius: constants.PATH_RADIUS_INITIAL,
            stroke: constants.PATH_STROKE,
            strokeWidth: constants.PATH_STROKE_WIDTH
        });

        layerOrbit.add(path);
        layerOrbit.draw();
    }

    function moveBall(ball, path) {
        var x = path.getX() + path.getRadius() * Math.cos(ball.angle),
            y = path.getY() + path.getRadius() * Math.sin(ball.angle);

        ball.setX(x);
        ball.setY(y);
        //ball.setFill(getRandomColor());
    }

    function movePath(path) {
        path.setX(path.getX() - constants.PATH_MOVE_X);
        path.setY(path.getY() - constants.PATH_MOVE_Y);
        path.setRadius(path.getRadius() + constants.PATH_MOVE_RADIUS);
    }

    function moveCopy(ball) {
        var newBall = new Kinetic.Circle({
            x: ball.getX(),
            y: ball.getY(),
            radius: ball.getRadius(),
            fill: ball.getFill(),
            stroke: ball.getStroke()
        });

        layerOrbit.add(newBall);
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

    stage.add(layerOrbit);
    stage.add(layer);

    getBalls();
    getPath();

    return step();
} ());