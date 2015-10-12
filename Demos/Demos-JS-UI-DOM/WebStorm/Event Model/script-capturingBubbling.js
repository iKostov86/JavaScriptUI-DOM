var ul,
    li,
    i,
    target;

ul = document.createElement('ul');
li = document.createElement('li');
li.className = 'list-item';

for (i = 0; i < 5; i += 1) {
    li.innerHTML = 'Item #' + i;
    ul.appendChild(li.cloneNode(true));
}

ul.addEventListener('click', function (ev) {
    target = ev.target;

    if (ev.target.className.indexOf('list-item') >= 0) {
        console.log(this);
        console.log(ev.target.innerHTML);
    }
});

document.body.appendChild(ul);