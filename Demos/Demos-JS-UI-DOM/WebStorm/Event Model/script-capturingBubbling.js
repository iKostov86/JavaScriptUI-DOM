var ul,
    li,
    span,
    i,
    target;

ul = document.createElement('ul');
li = document.createElement('li');
li.className = 'list-item';

for (i = 0; i < 5; i += 1) {
    li.innerHTML = 'Item #' + i;
    ul.appendChild(li.cloneNode(true));
}

span = document.createElement('span');
ul.appendChild(span);

ul.addEventListener('click', function (ev) {
    target = ev.target;

    if (ev.target.className.indexOf('list-item') >= 0) {
        span.innerHTML = this.tagName + ': ' + ev.target.innerHTML;
    }
});

document.body.appendChild(ul);