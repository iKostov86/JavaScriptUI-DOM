var textArea = document.createElement('textarea'),
    inputOne = document.createElement('input'),
    inputTwo = document.createElement('input');

inputOne.type = 'color';
inputTwo.type =  'color';

textArea.style.display = 'block';
textArea.innerHTML = 'just text';

root.appendChild(textArea);
root.appendChild(inputOne);
root.appendChild(inputTwo);

inputOne.addEventListener('input', function () {
    textArea.style.color = inputOne.value;
}, false);

inputTwo.addEventListener('input', function () {
    textArea.style.backgroundColor = inputTwo.value;
}, false);
