(function () {
    var speed,
    //times = [],
        constants = {
            ACCELERATION: 0.001,
            IMAGE_SIZE: 75,
            IMAGE_SOURCE: 'http://www.familyfuntwincities.com/wp-content/uploads/2013/09/apple_red_1_clipart.png',
            TIME_INITIAL_VALUE: 1,
            SET_TIMEOUT_VALUE: 150
        };

    var stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: window.innerWidth * 1,
        height: window.innerHeight * 1
    });

    var layer1 = new Kinetic.Layer();
    var layer2 = new Kinetic.Layer();

    stage.add(layer2);
    stage.add(layer1);

    function animation() {
        var y;

        layer1.find('Image')
            .forEach(function (item, index) {
                speed = constants.ACCELERATION * item.t * item.t;
                //speed = a * times[index] * times[index];

                var isCollidingWithApple = layer2.find('Image')
                    .some(function (otherItem) {
                        if (Math.abs(item.getX() - otherItem.getX()) < constants.IMAGE_SIZE * 0.65 &&
                            Math.abs(item.getY() - otherItem.getY()) < constants.IMAGE_SIZE * 0.65) {
                            y = otherItem.getY();
                            return true;
                        }

                        return false;
                    });
                if (isCollidingWithApple) {
                    layer2.add(item);
                    layer2.draw();

                    item.setY(y - constants.IMAGE_SIZE * 0.65);
                } else if (item.getY() > (stage.getHeight() - item.getHeight())) {
                    layer2.add(item);
                    layer2.draw();

                    item.setY(stage.getHeight() - item.getHeight());
                    //times.splice(index, 1);
                } else {
                    item.setY(item.getY() + speed);
                }

                item.t += 1;
                //times[index] += 1;
            });

        requestAnimationFrame(animation);
        layer1.draw();
    }

    function fire() {

    }

    function getApple() {
        var canvasImage = new Image();
        canvasImage.src = constants.IMAGE_SOURCE;

        var kineticImage = new Kinetic.Image({
            x: getRandomNumber(0, stage.getWidth() - constants.IMAGE_SIZE + 1),
            y: 0,
            //y: getRandomNumber(0, stage.getHeight() - constants.IMAGE_SIZE + 1),
            width: constants.IMAGE_SIZE,
            height: constants.IMAGE_SIZE,
            image: canvasImage
        });

        kineticImage.t = constants.TIME_INITIAL_VALUE;
        //times.push(constants.TIME_INITIAL_VALUE);

        layer1.add(kineticImage);

        setTimeout(getApple, constants.SET_TIMEOUT_VALUE);
    }

    function getBackground () {
        var rect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: stage.getWidth(),
            height: stage.getHeight(),
            fill: 'gray',
            stroke: 'green',
            strokeWidth: 10
        });

        layer2.add(rect);
        layer2.draw();
    }

    function getPlayer() {
        var canvasImage = new Image();
        canvasImage.src = 'http://orig01.deviantart.net/1fe4/f/2013/298/7/3/the_second_rise_of_colonel_bahamut_chapter_1_by_tall3shyguy-d6rr16i.png';

        var kineticImage = new Kinetic.Image({
            x: 10,
            y: stage.getHeight() / 2 - constants.IMAGE_SIZE,
            width: constants.IMAGE_SIZE * 2,
            height: constants.IMAGE_SIZE * 2,
            image: canvasImage
        });

        layer2.add(kineticImage);
        layer2.draw();
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getHypotenuse(item1, item2) {

    }

    getBackground();
    getPlayer();
    getApple();

    return animation();
}());