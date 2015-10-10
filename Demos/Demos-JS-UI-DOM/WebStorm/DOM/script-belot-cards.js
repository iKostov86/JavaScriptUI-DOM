var root = document.createElement('div'),
    div = document.createElement('div'),
    //cardsSource = 'cardTheme2.png';
    cardsSource = 'http://belote.vbet.com/newBlot/cards/cardTheme2.png';

root.id = 'root';

div.style.position = 'absolute';
div.style.left = (document.body.clientWidth - 210) / 2 + 'px';
div.style.top = (document.body.clientHeight - 300) / 2 + 'px';
div.style.backgroundImage = 'url(' + cardsSource + ')';
div.style.backgroundPosition = (getRandomNumber(0, 8) | 0) * 210 + 'px '
    + (getRandomNumber(0, 4) | 0) * 300 + 'px';
div.style.width = '210px';
div.style.height = '300px';

root.appendChild(div);
document.body.insertBefore(root, document.body.firstChild);