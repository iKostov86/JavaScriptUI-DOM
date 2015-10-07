var list,
    li,
    a,
    span,
    liCopy,
    aCopy,
    spanCopy;

list = document.getElementById('list');

li = document.createElement('li');
a = document.createElement('a');
span = document.createElement('span');

span.innerHTML += 'Text 0';
a.appendChild(span);
li.appendChild(a);
ul.appendChild(li);

spanCopy = span.cloneNode(true);
aCopy = a.cloneNode(true);
liCopy = li.cloneNode(true);

spanCopy.innerHTML += 'Text 9.1';
aCopy.appendChild(spanCopy);
liCopy.appendChild(aCopy);
list.insertBefore(liCopy, list.lastElementChild);
//ul.insertBefore(anotherLi, ul.lastChild);