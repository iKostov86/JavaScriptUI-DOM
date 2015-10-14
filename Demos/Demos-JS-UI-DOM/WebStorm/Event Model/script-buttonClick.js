var root,
    rootTimeHandle,
    secondBtn,
    secondBtnCount,
    buttonContainer,
    buttonContainerCount;

root = document.getElementById('root');
root.addEventListener('click', onContainerClick);

secondBtn = document.getElementById('second-button');
secondBtn.onclick = onButtonClick;
secondBtnCount = 0;

function onButtonClick(ev) {
    var text;

    ev = ev || window.event;

    if (typeof ev !== 'undefined') {
        if (ev.target.id.toLowerCase() === 'button') {
            if (typeof rootTimeHandle !== 'undefined') {
                window.clearTimeout(rootTimeHandle);
            }

            text = root.getElementsByTagName('span')[0];
            text.innerHTML = 'You are clicked button.';

            rootTimeHandle = window.setTimeout(function () {
                text.innerHTML = 'TEXT';
            }, 3000);
        } else if (ev.target.id.toLowerCase() === 'second-button') {
            text = root.getElementsByTagName('span')[1];
            text.innerHTML = 'You are clicked button ' + ++secondBtnCount + ' times.';
        }
    }
}

function onContainerClick(ev) {
    var target,
        text;

    ev = ev || window.event;

    if (ev.target.tagName.toLowerCase() !== 'button') {
        if (ev.target.tagName.toLowerCase() === 'div') {
            target  = document.getElementById(ev.target.id);
        } else {
            target  = ev.target.parentNode;
        }

        text = target.getElementsByTagName('span')[1];
        text.innerHTML = 'You are clicked container.';
    }
}

buttonContainer = document.getElementById('button-container');
buttonContainer.addEventListener('click', onContainerButtonClick, false);
buttonContainerCount = 0;

function onContainerButtonClick(ev) {
    var text;

    //(ev || ev = window.event);
    ev = ev || window.event;

    text = buttonContainer.getElementsByTagName('span')[0];

    if (ev.target.tagName.toLowerCase() === 'button') {
        text.innerHTML = 'You are clicked button ' + ++buttonContainerCount + ' times.';
    } else {
        text.innerHTML = 'You are clicked container';
    }
}