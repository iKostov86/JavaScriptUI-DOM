(function (number) {
    var values = {
        ELLIPSE_RADIUS_X: 350,
        ELLIPSE_RADIUS_Y: 350
        },
        div = document.createElement('div'),
        angle = 0;

    div.style.width = '75px';
    div.style.height = '75px';
    div.style.background = getRandomColor();
    div.style.border = '5px solid black';
    div.style.position = 'absolute';
    div.className = 'moved';

    function animation() {
        var docFrag = document.createDocumentFragment(),
            rootChild = document.getElementsByClassName('moved');

        while (rootChild.length) {
            root.removeChild(rootChild[0]);
        }

        for (var i = 0; i < number; i += 1) {
            div.style.left = document.body.clientWidth / 2 + values.ELLIPSE_RADIUS_X * Math.cos(angle + 2 * Math.PI / number * i) + 'px';
            div.style.top = document.body.clientHeight / 2 + values.ELLIPSE_RADIUS_Y * Math.sin(angle + 2 * Math.PI / number * i) + 'px';

            docFrag.appendChild(div.cloneNode(true));
        }

        root.appendChild(docFrag);

        angle += 0.1;

        if (angle > 2 * Math.PI) {
            angle = 0;
        }

        setTimeout(animation, getRandomNumber(50, 100));
        //requestAnimationFrame(animation);
    }

    function changeAttributes() {
        values.ELLIPSE_RADIUS_X = getRandomNumber(100, 600);
        values.ELLIPSE_RADIUS_Y = getRandomNumber(100, 300);

        div.style.width = getRandomNumber(45, 75) + 'px';
        div.style.height = getRandomNumber(45, 75) + 'px';
        div.style.background = getRandomColor();

        setTimeout(changeAttributes, getRandomNumber(3000, 5000));
    }

    animation();
    changeAttributes();
}(200));