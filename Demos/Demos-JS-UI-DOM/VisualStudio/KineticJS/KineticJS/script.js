var stage = new Kinetic.Stage({
    container: 'kinetic-container',
    width: window.innerWidth * 0.99,
    height: window.innerHeight * 0.99
});

var layer = new Kinetic.Layer();

var rect = new Kinetic.Rect({
    x: 50,
    y: 50,
    width: 1300,
    height: 800,
    fill: 'green',
    stroke: 'blue',
    lineWidth: 5
});

layer.add(rect);
stage.add(layer);