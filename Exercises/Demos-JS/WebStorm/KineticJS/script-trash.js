window.onload = function () {
    var stage,
        layer,
        kineticImage;

    stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: document.body.clientWidth,
        height: document.body.clientHeight
    });

    layer = new Kinetic.Layer();

    var canvasImage = new Image();
    canvasImage.src = 'http://www.apple.com/ipad-mini-4/images/og_image.jpg?201509172130';

    canvasImage.onload = function () {
        kineticImage = new Kinetic.Image({
            x: 0,
            y: 0,
            width: 200,
            height: 200,
            image: canvasImage,
            //draggable: true
        });

        //layer.add(kineticImage);
        //layer.draw();
    };

    stage.add(layer);

    function dryn () {
        layer.add(kineticImage);
        layer.draw();
    }

    setTimeout(dryn, 3000);
};


//function loadImages(callback) {
//    for (var i = 0; i < imageURLs.length; i += 1) {
//        var img = new Image();
//
//        images.push(img);
//        img.onload = function(){
//            imagesOK += 1;
//            if (imagesOK >= imageURLs.length) {
//                callback();
//            }
//        };
//        img.onerror = function(){
//            alert("image load failed");
//        }
//        img.crossOrigin="anonymous";
//        img.src = imageURLs[i];
//    }
//}
//
//function loadImagesCallback() {
//    for(var i = 0; i < images.length; i += 1){
//        var img = new Kinetic.Image({
//            x: 0,
//            y: 0,
//            width: 200,
//            height: 200,
//            image: images[i],
//            draggable: true
//        });
//
//        layerBG.add(img);
//    }
//
//    layerBG.draw();
//}
//
//loadImages(loadImagesCallback);