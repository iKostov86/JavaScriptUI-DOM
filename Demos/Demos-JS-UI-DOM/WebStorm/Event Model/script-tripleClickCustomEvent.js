function attachEventHandler(element, eventType, eventHandler) {
    if (!element) {
        return;
    }
    if (document.addEventListener) {
        element.addEventListener(eventType, eventHandler, true);
    } else if (document.attachEvent) {
        element.attachEvent('on' + eventType, eventHandler);
    } else {
        element['on' + eventType] = eventHandler;
    }
}

var container,
    button,
    text,
    tripleClickEvent,
    timeHandle,
    count;

container = document.getElementById('triple-container');
button = container.getElementsByTagName('button')[0];
text = container.getElementsByTagName('span')[0];
tripleClickEvent = new CustomEvent('tripleClick');
count = 0;

attachEventHandler(button, 'click', function () {
    if (typeof timeHandle !== 'undefined') {
        window.clearTimeout(timeHandle);
    }

    count++;
    if (count === 3) {
        count = 0;

        button.dispatchEvent(tripleClickEvent);
    }

    timeHandle = setTimeout(function() {
        text.innerHTML = 'TEXT';
        count = 0;
    }, 750);
});

attachEventHandler(button, 'tripleClick', function () {
    text.innerHTML = 'You are triple clicked button.';
});