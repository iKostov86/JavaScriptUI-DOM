(function () {
    var balls = 25;

    var stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: document.body.clientWidth,
        height: document.body.clientHeight
    });

    var layerOrbit = new Kinetic.Layer();
    var layer = new Kinetic.Layer();

    function step() {
        layer.find('Circle')
            .forEach(function (ball) {
                ball.angle += ball.speed;

                if (ball.angle === Math.PI * 2) {
                    ball.angle = 0;
                }

                ball.setX(calculateX(ball.angle));
                ball.setY(calculateY(ball.angle));
                ball.setStroke(getRandomColor());
            });

        layer.draw();

        //setTimeout(step, 100);
        requestAnimationFrame(step);
    }

    function getBalls() {
        for (var i = 0; i < balls; i += 1) {
            layer.add(getBall());
        }
    }

    function getBall() {
        var ball = new Kinetic.Circle({
            x: 0,
            y: 0,
            radius: getRandomNumber(35, 75),
            fill: getRandomColor(),
            stroke: getRandomColor()
        });

        ball.angle = getRandomNumber(0, Math.PI * 2);
        ball.speed = Math.PI / getRandomNumber(60, 180);

        return ball;
    }

    function getPath() {
        var path = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 400,
            stroke: 'black',
            strokeWidth: 15
        });

        layerOrbit.add(path);
        layerOrbit.draw();
    }

    function calculateX(angle) {
        var path = layerOrbit.find('Circle')[0];

        return path.getX() + path.getRadius() * Math.cos(angle);
    }

    function calculateY(angle) {
        var path = layerOrbit.find('Circle')[0];

        return path.getY() + path.getRadius() * Math.sin(angle);
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
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
} ())