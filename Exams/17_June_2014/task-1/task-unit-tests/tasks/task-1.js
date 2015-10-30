/* globals module */

//function solve() {
//
//    return function (selector, items) {
//        var root = document.querySelector(selector);
//        var left = document.createElement('div');
//        left.className = 'image-preview';
//        var title = document.createElement('strong');
//        title.innerHTML = items[0].title;
//        var img = document.createElement('img');
//        img.src = items[0].url;
//        left.appendChild(title);
//        left.appendChild(img);
//
//        var right = document.createElement('div');
//
//        items.forEach(function (item) {
//            var imgContainer = document.createElement('div');
//            imgContainer.className = 'image-container';
//
//            var title = document.createElement('strong');
//            title.innerHTML = item.title;
//            var img = document.createElement('img');
//            img.width = '150';
//            img.src = item.url;
//
//            imgContainer.appendChild(title);
//            imgContainer.appendChild(img);
//
//            right.appendChild(imgContainer);
//        });
//
//        right.addEventListener('click', function (ev) {
//            var target = ev.target;
//            if (!(target instanceof HTMLImageElement)) {
//                return;
//            }
//            img.src = target.src;
//            title.innerHTML = target.previousElementSibling.innerHTML;
//        });
//
//        right.addEventListener('mouseover', function (ev) {
//            var target = ev.target;
//            console.log(target.className);
//            if (target.className.indexOf('image-container') < 0) {
//                return;
//            }
//            target.style.background = 'black';
//        });
//
//        right.addEventListener('mouseout', function (ev) {
//            var target = ev.target;
//
//            if (target.className.indexOf('image-container') < 0) {
//                return;
//            }
//
//            target.style.background = '';
//        });
//
//        root.appendChild(left);
//        root.appendChild(right);
//    };
//}

function solve() {

    return function (selector, items) {
        document.body.style.backgroundColor = '#2845d1';

        var root = document.querySelector(selector);
        root.style.textAlign = 'center';

        var left = document.createElement('div');
        var right = document.createElement('div');

        left.className = 'left-panel';
        left.className += ' image-preview';
        left.style.float = 'left';
        left.style.width = '50%';
        left.style.height = '500px';
        left.style.backgroundColor = 'orange';
        left.style.borderRadius = '10px';

        right.className = 'right-panel';
        right.style.float = 'left';
        right.style.width = '20%';
        right.style.height = '500px';
        right.style.marginLeft = '10px';

        //left
        var title = document.createElement('h1');
        title.innerHTML = items[0].title;

        var img = document.createElement('img');
        img.src = items[0].url;
        img.style.width = '500px';
        img.style.height = '400px';
        img.style.borderRadius = '10px';

        left.appendChild(title);
        left.appendChild(img);

        //right
        var label = document.createElement('label');
        label.innerHTML = 'Filter';
        label.style.display = 'block';
        label.setAttribute('for', 'filter-id');

        var filter = document.createElement('input');
        filter.style.width = '90%';

        var filterWrapper = document.createElement('div');
        filterWrapper.style.height = '10%';
        filterWrapper.style.backgroundColor = 'lightblue';
        filterWrapper.style.borderRadius = '10px 10px 0 0';

        var imgWrapper = document.createElement('div');
        imgWrapper.className = 'image-wrapper';
        imgWrapper.style.height = '90%';
        imgWrapper.style.backgroundColor = '#11ff11';
        imgWrapper.style.overflowY = 'scroll';

        filterWrapper.appendChild(label);
        filterWrapper.appendChild(filter);

        right.appendChild(filterWrapper);
        right.appendChild(imgWrapper);

        //items
        items.forEach(function (item) {
            var itemContainer = document.createElement('div');
            itemContainer.className = 'image-container';
            itemContainer.style.backgroundColor = 'violet';
            itemContainer.style.borderRadius = '10px';

            var itemTitle = document.createElement('h3');
            itemTitle.innerHTML = item.title;
            itemTitle.style.height = '10px';

            var itemImg = document.createElement('img');
            itemImg.src = item.url;
            itemImg.style.width = '90%';
            itemImg.style.height = '150px';
            itemImg.style.borderRadius = '10px';

            itemContainer.appendChild(itemTitle);
            itemContainer.appendChild(itemImg);

            imgWrapper.appendChild(itemContainer);
        });

        //events
        filter.addEventListener('input', function () {
            var i,
                len,
                text,
                value = this.value.toLowerCase(),
                titles = imgWrapper.querySelectorAll('h3');

            if (!value) {
                for (i = 0, len = titles.length; i < len; i += 1) {
                    show(i);
                }
            } else {
                for (i = 0, len = titles.length; i < len; i += 1) {
                    text = titles[i].innerHTML.toLowerCase();

                    if (text.indexOf(value) < 0) {
                        hide(i);
                    } else {
                        show(i);
                    }
                }
            }

            function hide(i) {
                titles[i].parentNode.style.display = 'none';
            }

            function show(i) {
                titles[i].parentNode.style.display = '';
            }
        });

        imgWrapper.addEventListener('mouseover', function (ev) {
            var target = ev.target;

            if (target.className !== 'image-wrapper') {
                while (target.className.indexOf('image-container') < 0) {
                    target = target.parentNode;
                }

                target.style.backgroundColor = '';
            }
        });

        imgWrapper.addEventListener('mouseout', function (ev) {
            var target = ev.target;

            if (target.className !== 'image-wrapper') {
                while (target.className.indexOf('image-container') < 0) {
                    target = target.parentNode;
                }

                target.style.backgroundColor = 'violet';
            }
        });

        imgWrapper.addEventListener('click', function (ev) {
            var target = ev.target;

            if (target.className === 'image-wrapper') {
                return;
            }

            while (target.className.indexOf('image-container') < 0) {
                target = target.parentNode;
            }

            title.innerHTML = target.querySelector('h3').textContent;
            img.src = target.querySelector('img').src;
        });

        function clear(node) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        }

        root.appendChild(left);
        root.appendChild(right);
    };
}

module.exports = solve;