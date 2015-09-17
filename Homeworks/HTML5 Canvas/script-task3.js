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
        SNAKE_LEVEL: 10,
        SNAKE_SIZES_X: 24,
        SNAKE_SIZES_Y: 24,
        SNAKE_SIZES_R: 16,
        FEED_SIZES_R: 16,
        FEED_FILL_STYLE: getRandomColor(),
        TEXT_FILL_STYLE: getRandomColor(),
        GAME_LOGO_TEXT: 'SNAKE GAME',
        GAME_OVER_TEXT: 'GAME OVER',
        GAME_LOGO_FONT: '88px Algerian',
        SCORE_FONT: '32px Algerian',
        GAME_OVER_FONT: '72px Algerian'
    };

    var canvas = document.getElementById('the-canvas'),
        ctx = canvas.getContext('2d'),
        snake = getSnake(),
        feed = getFeed(),
        pause = false,
        isOver = false,
        speed = constants.SNAKE_SPEED,
        keyState,
        timerId;

    document.onkeydown = checkKeyState;

    ctx.fillStyle = snake.color;

    function animation() {
        clearCanvas();
        drawScore();
        drawFeed();
        drawSnake();
        checkBoundaries();
        moveSnake();
        checkFeed();
        checkDirection();

        if (!isOver) {
            timerId = setTimeout(animation, speed);
        }
        //requestAnimationFrame(animation);
    }

    function moveSnake() {
        var i;

        for (i = 0; i < snake.length; i += 1) {
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

    function checkDirection() {
        var i,
            oldDirection,
            newDirection = snake.current.directions[0];

        for (i = 1; i < snake.length; i += 1) {
            if (snake.current.directions[i] !== newDirection) {
                oldDirection = newDirection;
                newDirection = snake.current.directions[i];
                snake.current.directions[i] = oldDirection;
            }
        }
    }

    function checkBoundaries() {
        var i;

        for (i = 0; i < snake.length; i += 1) {
            if (snake.current.w[i] > canvas.width - snake.sizes.r ||
            snake.current.h[i] > canvas.height - snake.sizes.r ||
            snake.current.w[i] < snake.sizes.r ||
            snake.current.h[i] < snake.sizes.r) {
                drawScore();
                drawGameOver();
                break;
            }
        }
    }

    function checkFeed() {
        var i;

        for (i = 0; i < snake.length; i += 1) {
            if (snake.current.w[i] - snake.sizes.r <= feed.x && feed.x <= snake.current.w[i] + snake.sizes.r &&
            snake.current.h[i] - snake.sizes.r <= feed.y && feed.y <= snake.current.h[i] + snake.sizes.r) {
                feed = getFeed();
                snake.current.score += 1;
                if (snake.current.score === constants.SNAKE_LEVEL) {
                    snake = getSnake();
                    speed = speed - constants.SNAKE_LEVEL;
                }
                growSnake();
                break;
            }
        }
    }

    function checkKeyState(e) {
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
                if (pause) {
                    setTimeout(animation, speed);
                    pause = false;
                } else {
                    clearTimeout(timerId);
                    pause = true;
                }
                break;
        }

        if (typeof keyState !== 'undefined' && keyState !== snake.current.directions[0]) {
            snake.current.directions[0] = keyState;
        }
    }

    function drawSnake() {
        var i;

        ctx.fillStyle = snake.color;
        for (i = 0; i < snake.length; i += 1) {
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
    }

    function drawScore() {
        ctx.font = constants.SCORE_FONT;
        ctx.fillStyle = constants.TEXT_FILL_STYLE;
        ctx.fillText(snake.current.score + ' pts', 100, 50);
        ctx.fillText('Esc => pause / resume', 100, canvas.height - 100);
        ctx.fillText('F5 => start game', 100, canvas.height - 50);
        ctx.font = constants.GAME_LOGO_FONT;
        ctx.fillText(constants.GAME_LOGO_TEXT, 2 * canvas.width / 3, 100);
    }

    function drawGameOver() {
        var text = constants.GAME_OVER_TEXT,
            x = (canvas.width - (text.length * constants.GAME_OVER_FONT.split('px')[0] / 2)) / 2,
            y = canvas.height / 2;

        ctx.font = constants.GAME_OVER_FONT;
        ctx.fillStyle = constants.TEXT_FILL_STYLE;
        ctx.fillText(text, x, y);
        isOver = true;
    }

    function growSnake() {
        switch (snake.current.directions[snake.length - 1]) {
            case 'right':
                snake.current.w[snake.length] = snake.current.w[snake.length - 1] - snake.sizes.r * 2;
                snake.current.h[snake.length] = snake.current.h[snake.length - 1];
                break;
            case 'left':
                snake.current.w[snake.length] = snake.current.w[snake.length - 1] + snake.sizes.r * 2;
                snake.current.h[snake.length] = snake.current.h[snake.length - 1];
                break;
            case 'up':
                snake.current.w[snake.length] = snake.current.w[snake.length - 1];
                snake.current.h[snake.length] = snake.current.h[snake.length - 1] + snake.sizes.r * 2;
                break;
            case 'down':
                snake.current.w[snake.length] = snake.current.w[snake.length - 1];
                snake.current.h[snake.length] = snake.current.h[snake.length - 1] - snake.sizes.r * 2;
                break;
        }

        snake.current.directions[snake.length] = snake.current.directions[snake.length - 1];
        snake.length += 1;
    }

    function growLevel() {
    }

    function getSnake() {
        var i,
            snake = {};

        snake.color = getRandomColor();
        snake.direction = getRandomDirection();
        snake.length = getRandomNumber(1, 5);
        snake.start = {
            x: getRandomNumber(constants.SNAKE_SIZES_R * snake.length * 2,
                canvas.width - constants.SNAKE_SIZES_R * snake.length * 2),
            y: getRandomNumber(constants.SNAKE_SIZES_R * snake.length * 2,
                canvas.height - constants.SNAKE_SIZES_R * snake.length * 2)
        };
        snake.sizes = {
            x: constants.SNAKE_SIZES_X,
            y: constants.SNAKE_SIZES_Y,
            r: constants.SNAKE_SIZES_R
        };
        snake.current = {
            w: new Array(snake.length),
            h: new Array(snake.length),
            directions: new Array(snake.length),
            score: 0
        };

        snake.current.w[0] = snake.start.x;
        snake.current.h[0] = snake.start.y;

        switch (snake.direction) {
            case 'right':
                for (i = 1; i < snake.length; i += 1) {
                    snake.current.w[i] = snake.current.w[i - 1] - snake.sizes.r * 2;
                    snake.current.h[i] = snake.current.h[i - 1];
                }
                break;
            case 'left':
                for (i = 1; i < snake.length; i += 1) {
                    snake.current.w[i] = snake.current.w[i - 1] + snake.sizes.r * 2;
                    snake.current.h[i] = snake.current.h[i - 1];
                }
                break;
            case 'up':
                for (i = 1; i < snake.length; i += 1) {
                    snake.current.w[i] = snake.current.w[i - 1];
                    snake.current.h[i] = snake.current.h[i - 1] + snake.sizes.r * 2;
                }
                break;
            case 'down':
                for (i = 1; i < snake.length; i += 1) {
                    snake.current.w[i] = snake.current.w[i - 1];
                    snake.current.h[i] = snake.current.h[i - 1] - snake.sizes.r * 2;
                }
                break;
        }

        snake.current.directions.fill(snake.direction);

        return snake;
    }

    function getFeed() {
        var feed = {
            x: getRandomNumber(constants.SNAKE_SIZES_R * 2, canvas.width - constants.SNAKE_SIZES_R * 2),
            y: getRandomNumber(constants.SNAKE_SIZES_R * 2, canvas.height - constants.SNAKE_SIZES_R * 2),
            r: constants.FEED_SIZES_R
        };

        return feed;
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

    return animation();
}());