if (!Array.prototype.fill) {
    Array.prototype.fill = function(value) {

        // Steps 1-2.
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        var O = Object(this);

        // Steps 3-5.
        var len = O.length >>> 0;

        // Steps 6-7.
        var start = arguments[1];
        var relativeStart = start >> 0;

        // Step 8.
        var k = relativeStart < 0 ?
            Math.max(len + relativeStart, 0) :
            Math.min(relativeStart, len);

        // Steps 9-10.
        var end = arguments[2];
        var relativeEnd = end === undefined ?
            len : end >> 0;

        // Step 11.
        var final = relativeEnd < 0 ?
            Math.max(len + relativeEnd, 0) :
            Math.min(relativeEnd, len);

        // Step 12.
        while (k < final) {
            O[k] = value;
            k++;
        }

        // Step 13.
        return O;
    };
}

(function () {
    const constants = {
        SNAKE_SPEED: 150,
        SNAKE_GROW_SPEED: 10,
        SNAKE_LEVEL_UP: 55,
        SNAKE_SIZES_X: 24,
        SNAKE_SIZES_Y: 24,
        SNAKE_SIZES_R: 16,
        FEED_SIZES_R: 16,
        FEED_FILL_STYLE: getRandomColor(),
        TEXT_FILL_STYLE: getRandomColor(),
        GAME_LOGO_TEXT: 'SNAKE GAME',
        GAME_OVER_TEXT: 'GAME OVER',
        GAME_PAUSE_TEXT: 'PAUSE',
        GAME_LOGO_FONT: '88px Algerian',
        SCORE_FONT: '32px Algerian',
        GAME_OVER_FONT: '72px Algerian',
        CANVAS_WIDTH: document.body.clientWidth,
        CANVAS_HEIGHT: document.body.clientHeight
    };

    var newGame = document.getElementById('new-game'),
        clearGame = document.getElementById('clear-game'),
        canvas = document.getElementById('the-canvas'),
        ctx = canvas.getContext('2d'),
        image = new Image(),
        feedImg = new Image(),
        timerId;
    //requestId;

    canvas.width = constants.CANVAS_WIDTH;
    canvas.height = constants.CANVAS_HEIGHT;

    newGame.addEventListener("click", play);

    function play() {
        var snake = getSnake(),
            feed = getFeed(),
            pause = true,
            isOver = false,
            keyState;

        document.onkeydown = updateKeyState;
        clearGame.addEventListener("click", stop);
        image.src = 'http://cartoon-animals.disneyandcartoons.com/_/rsrc/1365530108702/cartoon-snake-images/Snake-Clipart_9.png?height=400&width=400';
        feedImg.src = 'http://www.capitalotc.com/wp-content/uploads/2014/11/apple-might-remove-google-search-engine.png';

        if (typeof timerId !== 'undefined') {
            clearInterval(timerId);
        }

        ctx.fillStyle = snake.color;

        function animation() {
            clearCanvas();
            drawCanvasImage();
            drawGameText();
            drawFeed();
            drawSnake();
            checkBoundaries();
            checkIfFeedEaten();
            updateMove();
            updateDirection();

            if (!isOver && !pause) {
                timerId = setTimeout(function() {
                    requestAnimationFrame(animation);
                }, snake.current.speed);
                //requestId = requestAnimationFrame(animation);
            }
        }

        function updateMove() {
            var i;

            for (i = 0; i < snake.current.length; i += 1) {
                switch (snake.current.directions[i]) {
                    case 'right':
                        snake.current.w[i] = snake.current.w[i] + snake.sizes.r * 2;
                        break;
                    case 'left':
                        snake.current.w[i] = snake.current.w[i] - snake.sizes.r * 2;
                        break;
                    case 'up':
                        snake.current.h[i] = snake.current.h[i] - snake.sizes.r * 2;
                        break;
                    case 'down':
                        snake.current.h[i] = snake.current.h[i] + snake.sizes.r * 2;
                        break;
                }
            }
        }

        function updateDirection() {
            var i,
                direction,
                newDirection = snake.current.directions[0];

            for (i = 1; i < snake.current.length; i += 1) {
                if (snake.current.directions[i] !== newDirection) {
                    direction = newDirection;
                    newDirection = snake.current.directions[i];
                    snake.current.directions[i] = direction;
                }
            }
        }

        function updateKeyState(e) {
            if (pause) {
                if (e.keyCode === 27) {
                    timerId = setTimeout(function () {
                        requestAnimationFrame(animation);
                    }, snake.current.speed);
                    //requestId = requestAnimationFrame(animation);
                    pause = false;
                }
            } else {
                switch (e.keyCode) {
                    case 37:
                        keyState = 'left';
                        break;
                    case 38:
                        keyState = 'up';
                        break;
                    case 39:
                        keyState = 'right';
                        break;
                    case 40:
                        keyState = 'down';
                        break;
                    case 27:
                        clearTimeout(timerId);
                        //cancelAnimationFrame(requestId);
                        pause = true;
                        break;
                }
            }

            if (typeof keyState !== 'undefined' && keyState !== snake.current.directions[0]) {
                snake.current.directions[0] = keyState;
            }
        }

        function checkBoundaries() {
            if (snake.current.w[0] > canvas.width - snake.sizes.r ||
                snake.current.h[0] > canvas.height - snake.sizes.r ||
                snake.current.w[0] < snake.sizes.r ||
                snake.current.h[0] < snake.sizes.r) {
                drawGameText();
                drawGameOver();
            }
        }

        function checkIfFeedEaten() {
            if (snake.current.w[0] - snake.sizes.r <= feed.x && feed.x <= snake.current.w[0] + snake.sizes.r &&
                snake.current.h[0] - snake.sizes.r <= feed.y && feed.y <= snake.current.h[0] + snake.sizes.r) {
                growSnake();

                if (snake.current.score === constants.SNAKE_LEVEL_UP * snake.current.level) {
                    snake.current.level += 1;
                    getLevel();
                }

                feed = getFeed();
            }

            //if (snake.current.w[0] - snake.sizes.r <= feed.x + feed.r * 4 && feed.x + feed.r * 4 <= snake.current.w[0] + snake.sizes.r &&
            //    snake.current.h[0] - snake.sizes.r <= feed.y + feed.r * 4 && feed.y + feed.r * 4 <= snake.current.h[0] + snake.sizes.r) {
            //    snake.current.score += 1;
            //    growSnake();
            //
            //    if (snake.current.score === constants.SNAKE_LEVEL_UP * snake.current.level) {
            //        snake.current.level += 1;
            //        getLevel();
            //    }
            //
            //    feed = getFeed();
            //}
        }

        function drawSnake() {
            var i;

            ctx.fillStyle = snake.color;
            for (i = 0; i < snake.current.length; i += 1) {
                ctx.beginPath();
                ctx.arc(snake.current.w[i], snake.current.h[i], snake.sizes.r, 0, 2 * Math.PI);
                ctx.fill();
            }

            ctx.fillStyle = getRandomColor();
            ctx.beginPath();
            ctx.arc(snake.current.w[0] - snake.sizes.r / 2, snake.current.h[0], snake.sizes.r / 2, 0, 2 * Math.PI);
            ctx.arc(snake.current.w[0] + snake.sizes.r / 2, snake.current.h[0], snake.sizes.r / 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = snake.color;
        }

        function drawFeed() {
            ctx.fillStyle = constants.FEED_FILL_STYLE;
            ctx.beginPath();
            ctx.arc(feed.x, feed.y, feed.r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = snake.color;

            //ctx.drawImage(feedImg, feed.x, feed.y, feed.r * 4, feed.r * 4);
        }

        function drawGameText() {
            ctx.font = constants.SCORE_FONT;
            ctx.fillStyle = constants.TEXT_FILL_STYLE;
            ctx.fillText(snake.current.score + ' pts', 100, 50);

            ctx.fillText(snake.current.level + ' lvl', 250, 50);

            ctx.fillText('Esc => pause / resume', 100, canvas.height - 100);
            ctx.fillText('F5 => refresh canvas', 100, canvas.height - 50);

            ctx.font = constants.GAME_LOGO_FONT;
            ctx.fillText(constants.GAME_LOGO_TEXT,
                canvas.width - constants.GAME_LOGO_TEXT.length * constants.GAME_OVER_FONT.split('px')[0], 100);
        }

        function drawCanvasImage(side) {
            if (side === 'left') {
                ctx.drawImage(image, canvas.width * 0.65, canvas.height * 0.2, image.width, image.height);
            } else {
                ctx.drawImage(image, canvas.width * 0.65, canvas.height * 0.2, image.width, image.height);
            }
        }

        function drawGameOver() {
            var text = constants.GAME_OVER_TEXT,
                x = (canvas.width - (text.length * constants.GAME_OVER_FONT.split('px')[0] / 2)) / 2,
                y = canvas.height / 2;

            ctx.font = constants.GAME_OVER_FONT;
            ctx.fillStyle = constants.TEXT_FILL_STYLE;
            ctx.fillText(text, x, y);
            isOver = true;
            stop();
        }

        function growSnake() {
            switch (snake.current.directions[snake.current.length - 1]) {
                case 'right':
                    snake.current.w[snake.current.length] = snake.current.w[snake.current.length - 1] - snake.sizes.r * 2;
                    snake.current.h[snake.current.length] = snake.current.h[snake.current.length - 1];
                    break;
                case 'left':
                    snake.current.w[snake.current.length] = snake.current.w[snake.current.length - 1] + snake.sizes.r * 2;
                    snake.current.h[snake.current.length] = snake.current.h[snake.current.length - 1];
                    break;
                case 'up':
                    snake.current.w[snake.current.length] = snake.current.w[snake.current.length - 1];
                    snake.current.h[snake.current.length] = snake.current.h[snake.current.length - 1] + snake.sizes.r * 2;
                    break;
                case 'down':
                    snake.current.w[snake.current.length] = snake.current.w[snake.current.length - 1];
                    snake.current.h[snake.current.length] = snake.current.h[snake.current.length - 1] - snake.sizes.r * 2;
                    break;
            }

            snake.current.directions[snake.current.length] = snake.current.directions[snake.current.length - 1];
            snake.current.length += 1;
        }

        function getLevel() {
            var e = {};
            e.keyCode = 27;
            updateKeyState(e);

            snake.current.length = snake.length;
            snake.current.speed = snake.current.speed - constants.SNAKE_GROW_SPEED;
            snake.current.w = snake.current.w.slice(0, snake.length);
            snake.current.h = snake.current.h.slice(0, snake.length);
            snake.current.directions = snake.current.directions.slice(0, snake.length);
        }

        function getSnake() {
            var i,
                newSnake = {};

            newSnake.color = getRandomColor();
            newSnake.direction = getRandomDirection();
            newSnake.length = getRandomNumber(1, 5),
                newSnake.start = {
                    x: getRandomNumber(constants.SNAKE_SIZES_R * newSnake.length * 2,
                        canvas.width - constants.SNAKE_SIZES_R * newSnake.length * 2),
                    y: getRandomNumber(constants.SNAKE_SIZES_R * newSnake.length * 2,
                        canvas.height - constants.SNAKE_SIZES_R * newSnake.length * 2)
                };
            newSnake.sizes = {
                x: constants.SNAKE_SIZES_X,
                y: constants.SNAKE_SIZES_Y,
                r: constants.SNAKE_SIZES_R
            };

            newSnake.current = {
                score: 0,
                level: 1,
                length: newSnake.length,
                speed: constants.SNAKE_SPEED,
                w: new Array(newSnake.length),
                h: new Array(newSnake.length),
                directions: new Array(newSnake.length)
            };

            newSnake.current.w[0] = newSnake.start.x;
            newSnake.current.h[0] = newSnake.start.y;

            switch (newSnake.direction) {
                case 'right':
                    for (i = 1; i < newSnake.length; i += 1) {
                        newSnake.current.w[i] = newSnake.current.w[i - 1] - newSnake.sizes.r * 2;
                        newSnake.current.h[i] = newSnake.current.h[i - 1];
                    }
                    break;
                case 'left':
                    for (i = 1; i < newSnake.length; i += 1) {
                        newSnake.current.w[i] = newSnake.current.w[i - 1] + newSnake.sizes.r * 2;
                        newSnake.current.h[i] = newSnake.current.h[i - 1];
                    }
                    break;
                case 'up':
                    for (i = 1; i < newSnake.length; i += 1) {
                        newSnake.current.w[i] = newSnake.current.w[i - 1];
                        newSnake.current.h[i] = newSnake.current.h[i - 1] + newSnake.sizes.r * 2;
                    }
                    break;
                case 'down':
                    for (i = 1; i < newSnake.length; i += 1) {
                        newSnake.current.w[i] = newSnake.current.w[i - 1];
                        newSnake.current.h[i] = newSnake.current.h[i - 1] - newSnake.sizes.r * 2;
                    }
                    break;
            }

            newSnake.current.directions.fill(newSnake.direction);

            return newSnake;
        }

        function getFeed() {
            var newFeed = {
                x: getRandomNumber(constants.FEED_SIZES_R * 2, canvas.width - constants.FEED_SIZES_R * 2),
                y: getRandomNumber(constants.FEED_SIZES_R * 2, canvas.height - constants.FEED_SIZES_R * 2),
                r: constants.FEED_SIZES_R
            };

            return newFeed;
        }

        function stop() {
            if (!isOver) {
                clearCanvas();
            }

            if (typeof timerId !== 'undefined') {
                clearInterval(timerId);
            }
            document.onkeydown = null;
        }

        return animation();
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomDirection() {
        var number = getRandomNumber(0, 100);
        if (number < 25) {
            return 'up';
        } else if (number < 50) {
            return 'right';
        } else if (number < 75) {
            return 'down';
        } else {
            return 'left';
        }
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

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}());