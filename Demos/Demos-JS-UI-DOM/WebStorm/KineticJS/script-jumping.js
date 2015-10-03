(function () {
    window.onload = function () {
        var stage,
            layer,
            layerBG,
            ball,
            constants,
            onJump,
            isOver;

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
            BALL_X_ACCELERATION: 0.1,
            BALL_X_DECELERATION: 0.15,
            BALL_Y_ACCELERATION: 0.2,
            BALL_Y_DECELERATION: 0.25,
            FUNDAMENTALS_WIDTH: 175,
            FUNDAMENTALS_HEIGHT: 50,
            GAME_OVER_IMG: 'https://lh3.googleusercontent.com/-hk3-q7XFs1w/U5105G5F8SI/AAAAAAAAAfQ/OMHmsK6-Dco/zoom_games_18.normal.color_000000.png',
            IMAGES_SOURCES: ['http://3.bp.blogspot.com/-zt_wXhDvv_Q/VI0u3M65zFI/AAAAAAAAAM0/eQHiw5EuhFI/s1600/apple-logo-black.png',
                'http://4.bp.blogspot.com/-kp9dUl08xCA/UODmryuwAYI/AAAAAAAApn4/-nFoS6F0cFE/s1600/AxFoCM-CMAEH868.jpg',
                'http://hdw.datawallpaper.com/nature/the-beauty-of-nature-wide-wallpaper-499995.jpg',
                'http://cs304304.vk.me/v304304772/59cc/DStHQW-F20A.jpg']
        };

        window.onkeydown = function(ev){
            switch (ev.keyCode) {
                case 32:
                    if (!onJump) {
                        onJump = true;
                        ball.deltaY = -1;
                        ball.speedY = constants.BALL_Y_ACCELERATION * 50;
                    }
                    break;
                case 37:
                    if (onJump) {
                        ball.deltaX = -1;
                        ball.speedX += constants.BALL_X_ACCELERATION * 5;
                    } else {
                        ball.deltaX = -1;
                        ball.speedX += constants.BALL_X_ACCELERATION * 10;
                    }
                    break;
                case 39:
                    if (onJump) {
                        ball.deltaX = 1;
                        ball.speedX += constants.BALL_X_ACCELERATION * 5;
                    } else {
                        ball.deltaX = 1;
                        ball.speedX += constants.BALL_X_ACCELERATION * 10;
                    }
                    break;
                default:
                    break;
            }
        };

        function start() {
            onJump = false;
            isOver = false;
            ball = getBall();

            for (var i = 0; i < 6; i += 1) {
                getFundamental(i * 200, stage.getHeight() * 0.75 - i * 100);
            }

            getTrophy((i - 1) * 200, stage.getHeight() * 0.75 - (i - 1) * 100 - constants.FUNDAMENTALS_HEIGHT * 2);

            layer.add(ball);

            stage.add(layerBG);
            stage.add(layer);

            step();
        }

        function step() {
            // y
            if (ball.deltaY === 1) {
                if (checkFundamentals()) {
                    onJump = false;
                    ball.deltaY = 0;
                    ball.speedY = 0;

                } else if (ball.getY() >= stage.getHeight() - ball.getRadius()) {
                    gameOverText();
                    gameOverImage();
                }
            } else if (ball.deltaY === -1) {
                if (ball.getY() <= 0 + ball.getRadius()) {
                    happyEnd();
                    ball.deltaY = 1;
                } else if (ball.speedY <= 0) {
                    ball.deltaY = 1;
                    ball.speedY = 0;
                }
            } else {
                if (!checkFundamentals()) {
                    ball.deltaY = 1;
                }
            }

            // x
            if (ball.deltaX === 1) {
                if (ball.getX() >= stage.getWidth() - ball.getRadius()) {
                    ball.deltaX = 0;
                } else if (ball.speedX <= 0) {
                    ball.deltaX = 0;
                    ball.speedX = 0;
                }
            } else if (ball.deltaX === -1) {
                if (ball.getX() <= 0 + ball.getRadius()) {
                    ball.deltaX = 0;
                } else if (ball.speedX <= 0) {
                    ball.deltaX = 0;
                    ball.speedX = 0;
                }
            }

            moveBall();
            layer.draw();

            if (!isOver) {
                requestAnimationFrame(step);
            } else {
                window.onkeydown = null;
            }
        }

        function checkFundamentals() {
            return layerBG.find('Rect').some(function (fundamental) {
                if (ball.getX() > fundamental.getX() &&
                    ball.getX() < fundamental.getX() + fundamental.getWidth() &&
                    ball.getY() > fundamental.getY() - ball.getRadius() &&
                    ball.getY() <= fundamental.getY() + fundamental.getHeight() - ball.getRadius()) {
                    ball.setY(fundamental.getY() - ball.getRadius());
                    return true
                }

                return false;
            });
        }

        function moveBall() {
            if (ball.deltaX === 1) {
                ball.speedX -= ball.decelerationX;
            } else if (ball.deltaX === -1) {
                ball.speedX -= ball.decelerationX;
            } else {
                ball.speedX = 0;
            }

            if (ball.deltaY === 1) {
                ball.speedY += ball.accelerationY;
            } else if (ball.deltaY === -1) {
                ball.speedY -= ball.decelerationY;
            } else {
                ball.speedY = 0;
            }

            ball.setX(ball.getX() + ball.deltaX * ball.speedX);
            ball.setY(ball.getY() + ball.deltaY * ball.speedY);
        }

        function getBall() {
            var ball = new Kinetic.Circle({
                x: constants.BALL_X,
                y: constants.BALL_Y,
                radius: constants.BALL_RADIUS,
                fill: getRandomColor()
            });

            ball.deltaX = 0;
            ball.deltaY = 0;
            ball.speedX = 0;
            ball.speedY = 0;
            ball.accelerationX = constants.BALL_X_ACCELERATION;
            ball.decelerationX = constants.BALL_X_DECELERATION;
            ball.accelerationY = constants.BALL_Y_ACCELERATION;
            ball.decelerationY = constants.BALL_Y_DECELERATION;

            return ball;
        }

        function getFundamental(x, y) {
            layerBG.add(new Kinetic.Rect({
                x: x,
                y: y,
                width: constants.FUNDAMENTALS_WIDTH,
                height: constants.FUNDAMENTALS_HEIGHT,
                fill: 'purple'
            }));

            layerBG.draw();
        }

        function getTrophy(x, y) {
            var canvasImage,
                kineticImage;

            canvasImage = new Image();
            canvasImage.src = constants.IMAGES_SOURCES[0];

            canvasImage.onload = function () {
                kineticImage = new Kinetic.Image({
                    x: x,
                    y: y,
                    width: 150,
                    height: 100,
                    image: canvasImage,
                    draggable: true
                });

                layerBG.add(kineticImage);
                layerBG.draw();
            };
        }

        function happyEnd() {
            var canvasImage,
                kineticImage;

            canvasImage = new Image();
            canvasImage.src = constants.IMAGES_SOURCES[3];

            canvasImage.onload = function () {
                kineticImage = new Kinetic.Image({
                    x: 0,
                    y: 0,
                    width: stage.getWidth(),
                    height: stage.getHeight(),
                    image: canvasImage,
                    draggable: true
                });

                layerBG.add(kineticImage);
                layerBG.draw();
            };

            isOver = true;
        }

        function gameOverText() {
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

            isOver = true;
        }

        function gameOverImage() {
            var canvasImage,
                kineticImage;

            canvasImage = new Image();
            canvasImage.src = constants.GAME_OVER_IMG;

            canvasImage.onload = function () {
                kineticImage = new Kinetic.Image({
                    x: 0,
                    y: 0,
                    width: stage.getWidth(),
                    height: stage.getHeight(),
                    image: canvasImage,
                    draggable: true
                });

                layerBG.add(kineticImage);
                layerBG.draw();
            };

            isOver = true;
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
    };
}());