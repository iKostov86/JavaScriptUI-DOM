var i,
    dFrag,
    container,
    list,
    li,
    liCopy,
    newContent;

dFrag = document.createDocumentFragment();
container = document.getElementById('container');
list = document.getElementById('list');

// slow way
for (i = 0; i < 10; i += 1) {
    li = document.createElement('li');
    li.innerHTML = i;
    list.appendChild(li);
}

container.appendChild(list);

// fast way
newContent = '';

for (i = 3; i <10; i += 1) {
    newContent += '\<li>Text ' + i + '\</li>';
}

list.innerHTML += newContent;

// appropriate way
li = document.createElement('li');

for (i = 0; i < 10; i += 1) {
    liCopy = li.cloneNode(true);
    liCopy.innerHTML = i;
    dFrag.appendChild(liCopy);
}

list.appendChild(dFrag);
container.appendChild(list);