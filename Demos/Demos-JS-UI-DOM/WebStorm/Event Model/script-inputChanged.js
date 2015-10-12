var input2,
    input3,
    inputCount;

input2 = document.getElementById('input2');
input2.onkeydown = onInputChanged;

input3 = document.getElementById('input3');
input3.addEventListener('keydown', onInputChanged, false);

inputCount = 0;

function onInputChanged() {
    var text = document.getElementById('text-input');

    text.innerHTML = 'You are changed input ' + ++inputCount + ' times.';
}