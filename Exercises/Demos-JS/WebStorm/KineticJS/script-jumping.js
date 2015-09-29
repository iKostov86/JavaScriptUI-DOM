(function () {
    var stage,
        layer,
        layerBG,
        ball,
        fundamental,
        constants;

    stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: document.body.clientWidth,
        height: document.body.clientHeight
    });

    layer = new Kinetic.Layer();
    layerBG = new Kinetic.Layer();

    constants = {
        BALL_X: 25,
        BALL_Y: stage.getHeight() * 0.75 - 25,
        BALL_RADIUS: 25,
        BALL_MOVE_X: 2,
        BALL_MIN_MOVE_Y: 4,
        BALL_MAX_MOVE_Y: 8,
        BALL_MIN_ACCELERATION: 0.11,
        BALL_MAX_ACCELERATION: 0.99,
        BALL_MIN_DECELERATION_DIFFERENCE: 0.01,
        BALL_MAX_DECELERATION_DIFFERENCE: 0.02
    };

    window.onkeydown = function(ev){
        if(ev.keyCode === 32){
            jumpBall();
        }
    };

    function start() {
        ball = getBall();
        fundamental = getFundamental();

        layerBG.add(fundamental);
        layer.add(ball);

        stage.add(layerBG);
        stage.add(layer);
    }

    function step() {
        if (ball.deltaX === 1 && ball.getX() >= stage.getWidth() - ball.getRadius()) {
            ball.deltaX = -1;
        } else if (ball.deltaX === -1 && ball.getX() <= 0 + ball.getRadius()) {
            ball.deltaX = 1;
        }

        if (ball.deltaY === 1) {
            if (ball.getY() >= stage.getHeight() - ball.getRadius()) {
                //ball.setY(stage.getHeight() - ball.getRadius());
                layerBG.add(ball);
                gameOver();
                //ball.deltaY = -1;
            }
        } else {
            if (ball.getY() <= 0 + ball.getRadius()) {
                ball.deltaY = 1;
            } else if (ball.speedY <= 0) {
                ball.deltaY = 1;
                ball.speedY = 0;
            }
        }

        if (layer.find('Circle').length !== 0) {
            moveBall(ball);

            layer.draw();

            //setTimeout(step, 100);
            requestAnimationFrame(step);
        }
    }

    function getFundamental() {
        var fundamental = new Kinetic.Rect({
            x: 0,
            y: stage.getHeight() * 0.75,
            width: 75,
            height: 50,
            fill: 'purple'
        });

        return fundamental;
    }

    function getBall() {
        var ball = new Kinetic.Circle({
            x: constants.BALL_X,
            y: constants.BALL_Y,
            radius: constants.BALL_RADIUS,
            fill: getRandomColor()
            //stroke: getRandomColor()
        });

        ball.deltaX = 0;
        ball.deltaY = 0;
        ball.speedX = 0;
        ball.speedY = 0;
        ball.acceleration = getRandomNumber(constants.BALL_MIN_ACCELERATION, constants.BALL_MAX_ACCELERATION);
        ball.deceleration = ball.acceleration +
            getRandomNumber(constants.BALL_MIN_DECELERATION_DIFFERENCE,constants.BALL_MAX_DECELERATION_DIFFERENCE);


        return ball;
    }

    function jumpBall() {
        ball.deltaY = -1;
        ball.speedY = getRandomNumber(constants.BALL_MIN_MOVE_Y, constants.BALL_MAX_MOVE_Y);

        step();
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

    function gameOver() {
        var gameOver = 'GAME OVER';

        var text = new Kinetic.Text({
            x: (stage.getWidth() - gameOver.length * 36) / 2,
            y: stage.getHeight() / 2,
            text: gameOver,
            fontSize: 72,
            fontFamily: 'Calibri',
            align: 'center',
            fill: 'blue'
        });

        layerBG.add(text);
        layerBG.draw();
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

    return start();
}());