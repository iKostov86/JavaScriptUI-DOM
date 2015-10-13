var ul,
    li,
    span,
    i,
    target;

ul = document.createElement('ul');
ul.innerHTML = 'MENU';

li = document.createElement('li');
li.className = 'list-item';
li.style.display = 'none';

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

ul.addEventListener('mouseover', function () {
    var ulLis = ul.querySelectorAll('*');
    
    for (var i = 0; i < ulLis.length; i += 1) {
        ulLis[i].style.display = 'block';
    }
}, false);

ul.addEventListener('mouseleave', function () {
    var ulLis = ul.querySelectorAll('*');

    for (var i = 0; i < ulLis.length; i += 1) {
        ulLis[i].style.display = 'none';
    }
}, false);

//window.addEventListener('click', function () {
//    var ulLis = ul.querySelectorAll('*');
//
//    for (var i = 0; i < ulLis.length; i += 1) {
//        ulLis[i].style.display = 'none';
//    }
//}, false);

document.body.appendChild(ul);