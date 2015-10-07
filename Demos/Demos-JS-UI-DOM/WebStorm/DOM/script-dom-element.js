var ul,
    firstSpan,
    secondSpan;

firstSpan = document.getElementById('first-span');
secondSpan = document.getElementById('second-span');

firstSpan.style.color = 'red';
secondSpan.style.border = '1px solid red';

ul = document.getElementById('list');

console.log(ul.lastElementChild.previousElementSibling);