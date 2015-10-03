var stage = new Kinetic.Stage({
    container: 'kinetic-container',
    width: window.innerWidth * 0.99,
    height: window.innerHeight * 0.99
});

var layerR = new Kinetic.Layer();
var layerL = new Kinetic.Layer();

//rect
var rect = new Kinetic.Rect({
    x: 50,
    y: 350,
    width: 300,
    height: 300,
    fill: 'green',
    stroke: 'blue',
    lineWidth: 5
});

function animation () {
    rect.setX(rect.getX() + 5);
    layerR.draw();
    requestAnimationFrame(animation);
}

//lines
var points = [];

for (var i = 0; i < stage.getWidth(); i += 50) {
    //update x
    points.push(i);
    //update y
    points.push(0 + ((points.length + 1) / 2) % 2 ? 945 : 0);
}

var line = new Kinetic.Line({
    points: points,
    fill: 'purple',
    stroke: 'purple',
    closed: true
});

layerL.add(line);
layerR.add(rect);

stage.add(layerR);
stage.add(layerL);

animation();