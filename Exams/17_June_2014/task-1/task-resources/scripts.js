//function createImagesPreviewer(selector, items) {
//    var root = document.querySelector(selector);
//    root.className += ' image-previewer';
//
//    var table = document.createElement('table');
//    table.style.height = '400px';
//    table.style.overflow = 'hidden';
//
//    var theRow = document.createElement('tr');
//    table.appendChild(theRow);
//    root.appendChild(table);
//
//    /* Left panel */
//    var leftPanel = document.createElement('td');
//    leftPanel.className += 'image-preview';
//    leftPanel.className += ' left-panel';
//
//    var title = document.createElement('h1');
//    title.innerHTML = items[0].title;
//
//    var bigImage = document.createElement('img');
//    bigImage.src = items[0].url;
//    console.log(bigImage)
//
//    leftPanel.appendChild(title);
//    leftPanel.appendChild(bigImage);
//    /* End of left panel */
//
//    /* Right panel */
//    var rightPanel = document.createElement('td');
//    rightPanel.className += ' right-panel';
//    rightPanel.style.textAlign = 'center';
//    rightPanel.style.overflowY = 'scroll';
//
//    var filter = document.createElement('div');
//    filter.className = 'filter';
//    var filterTitle = document.createElement('span');
//    filterTitle.innerHTML = 'Filter';
//    var filterBox = document.createElement('input');
//    filterBox.type = 'text';
//
//    filter.appendChild(filterTitle);
//    filter.appendChild(document.createElement('br'));
//    filter.appendChild(filterBox);
//
//    rightPanel.appendChild(filter);
//
//    var imgsList = document.createElement('ul');
//    imgsList.style.listStyleType = 'none';
//    imgsList.style.height = '200px';
//
//    for (var i = 0; i < items.length; i += 1) {
//        var imgItem = document.createElement('li');
//        imgItem.className = 'image-container';
//        imgItem.setAttribute('data-index', i + '');
//        imgItem.style.width = '150px';
//        imgItem.style.padding = '5px';
//
//        imgItem.addEventListener('mouseover', function (ev) {
//            this.style.backgroundColor = 'lightgray';
//        });
//
//        imgItem.addEventListener('mouseout', function (ev) {
//            this.style.backgroundColor = '';
//        });
//
//        imgItem.addEventListener('click', function (ev) {
//            var target = ev.target;
//            if (target.nodeName === 'IMG') {
//                title.innerHTML = target.previousSibling.textContent;
//                bigImage.src = target.src;
//            }
//
//            console.log(target.previousSibling.textContent);
//        });
//
//        var imgItemTitle = document.createElement('span');
//        imgItemTitle.innerHTML = items[i].title;
//        imgItem.appendChild(imgItemTitle);
//
//        var imgItemImg = document.createElement('img');
//        imgItemImg.src = items[i].url;
//        imgItemImg.style.maxWidth = '100%';
//
//        imgItem.appendChild(imgItemImg);
//        imgsList.appendChild(imgItem);
//    }
//
//    rightPanel.appendChild(imgsList);
//
//    /* End of right panel */
//
//    theRow.appendChild(leftPanel);
//    theRow.appendChild(rightPanel);
//}

function createImagesPreviewer(selector, items) {
    document.body.style.backgroundColor = '#2845d1';

    var root = document.querySelector(selector);
    root.style.textAlign = 'center';

    var left = document.createElement('div');
    var right = document.createElement('div');

    left.className = 'left-panel';
    left.className += ' image-preview';
    left.style.cssText = 'float: left; width: 50%; height: 500px; color: white; background-color: mediumslateblue; border-radius: 10px 0 0 10px;';

    right.className = 'right-panel';
    right.style.cssText = 'float: left; width: 20%; height: 500px; margin-left: 10px;';

    //left
    var title = document.createElement('h1');
    title.innerHTML = items[0].title;

    var img = document.createElement('img');
    img.src = items[0].url;
    img.style.cssText = 'width: 500px; height: 400px; border-radius: 10px;';

    left.appendChild(title);
    left.appendChild(img);

    //right
    var label = document.createElement('label');
    label.innerHTML = 'Filter';
    label.setAttribute('for', 'filter-id');
    label.style.cssText = 'display: block;';

    var filter = document.createElement('input');
    filter.id = 'filter-id';
    filter.style.cssText = 'width: 90%;';

    var filterWrapper = document.createElement('div');
    filterWrapper.style.cssText = 'height: 10%; background-color: lightblue;';

    var imgWrapper = document.createElement('div');
    imgWrapper.className = 'image-wrapper';
    imgWrapper.style.cssText = 'height: 90%; background-color: aquamarine; overflow-y: scroll';

    filterWrapper.appendChild(label);
    filterWrapper.appendChild(filter);

    right.appendChild(filterWrapper);
    right.appendChild(imgWrapper);

    //items
    var itemContainer = document.createElement('div');
    itemContainer.className = 'image-container';
    itemContainer.style.cssText = 'background-color: lightgray; border-radius: 10px; cursor: pointer;';

    var itemTitle = document.createElement('h3');
    itemTitle.style.cssText = 'height: 10px';

    var itemImg = document.createElement('img');
    itemImg.style.cssText = 'width: 90%; height: 150px; border-radius: 10px';

    items.forEach(function (item) {
        var currentItemContainer = itemContainer.cloneNode(true);

        var currentItemTitle = itemTitle.cloneNode(true);
        currentItemTitle.innerHTML = item.title;

        var currentItemImg = itemImg.cloneNode(true);
        currentItemImg.src = item.url;

        currentItemContainer.appendChild(currentItemTitle);
        currentItemContainer.appendChild(currentItemImg);

        imgWrapper.appendChild(currentItemContainer);
    });

    //events
    left.addEventListener('mouseover', function () {
        left.style.backgroundColor = 'orangered';
    });

    left.addEventListener('mouseout', function () {
        left.style.backgroundColor = 'mediumslateblue';
    });

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

            target.style.backgroundColor = 'gray';
        }
    });

    imgWrapper.addEventListener('mouseout', function (ev) {
        var target = ev.target;

        if (target.className !== 'image-wrapper') {
            while (target.className.indexOf('image-container') < 0) {
                target = target.parentNode;
            }

            target.style.backgroundColor = 'lightgray';
        }
    });

    imgWrapper.addEventListener('click', function (ev) {
        var target = ev.target;

        if (target.className !== 'image-wrapper') {
            while (target.className.indexOf('image-container') < 0) {
                target = target.parentNode;
            }

            title.innerHTML = target.querySelector('h3').textContent;
            img.src = target.querySelector('img').src;
        }
    });

    function clear(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    clear(root);

    root.appendChild(left);
    root.appendChild(right);
}