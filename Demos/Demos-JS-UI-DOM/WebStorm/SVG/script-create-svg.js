var container = document.getElementById('svg-container'),
    svg  = getSvg(window.innerWidth - 20, window.innerHeight - 20),
    svgNS = svg.namespaceURI,
    rect = getRect(10, 10, 200, 200);

svg.appendChild(rect);
container.appendChild(svg);
//document.body.appendChild(svg);

function getSvg(w, h) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svg.setAttribute('width', w + '');
    svg.setAttribute('height', h + '');
    //svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);

    return svg;
}

function getRect(x, y, w, h) {
    var rect = document.createElementNS(svgNS, 'rect');

    rect.setAttribute('x', x + '');
    rect.setAttribute('y', y + '');
    rect.setAttribute('width', w + '');
    rect.setAttribute('height', h + '');
    rect.setAttribute('fill', 'green');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('stroke-width', '5');

    rect.directionX = 1;
    rect.directionY = 1;
    rect.speed = 5;

    return rect;
}

function animation() {
    var currentX = +rect.getAttribute('x'),
        currentY = +rect.getAttribute('y'),
        svgWidth = +svg.getAttribute('width'),
        svgHeight = +svg.getAttribute('height');

    if (currentX >= svgWidth) {
        rect.directionX = -1;
    } else if (currentX <= 0) {
        rect.directionX = 1;
    }

    if (currentY >= svgHeight) {
        rect.directionY = -1;
    } else if (currentY <= 0) {
        rect.directionY = 1;
    }

    moveRect(currentX, currentY);

    setTimeout(animation, 50);
    //requestAnimationFrame(animation);
}

function moveRect(currentX, currentY) {
    rect.setAttribute('x', currentX + rect.directionX * rect.speed);
    rect.setAttribute('y', currentY + rect.directionY * rect.speed);
}

animation();
