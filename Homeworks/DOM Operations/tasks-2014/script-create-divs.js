(function (number) {
    var root = document.getElementById('root'),
        rootStyle = window.getComputedStyle(root),
        strong = document.createElement('strong');

    strong.innerHTML = 'div';

    for (var i = 0; i < number; i += 1) {
        var div = document.createElement('div');

        div.style.width = getRandomNumber(20, 100) + 'px';
        div.style.height = getRandomNumber(20, 100) + 'px';
        div.style.background = getRandomColor();
        div.style.border = getRandomNumber(1, 20) + 'px solid ' + getRandomColor();
        div.style.borderRadius = getRandomNumber(1, 25) + 'px';
        div.style.fontcolor = getRandomColor();
        div.style.position = 'absolute';
        div.style.left = getRandomNumber(parseFloat(rootStyle.getPropertyValue('border-width')),
                document.body.clientWidth - parseFloat(rootStyle.getPropertyValue('border-width')) - parseFloat(div.style.width) - parseFloat(div.style.borderWidth) * 2)
            + 'px';
        div.style.top = getRandomNumber(parseFloat(rootStyle.getPropertyValue('border-width')),
                document.body.clientHeight - parseFloat(rootStyle.getPropertyValue('border-width')) - parseFloat(div.style.height) - parseFloat(div.style.borderWidth) * 2)
            + 'px';

        div.appendChild(strong.cloneNode(true));
        root.appendChild(div);
    }
}(getRandomNumber(5, 8)));