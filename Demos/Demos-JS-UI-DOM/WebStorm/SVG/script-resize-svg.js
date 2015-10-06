var container = document.getElementById('svg-container'),
    svg = document.getElementById('the-svg');

svg.setAttribute('width', svg.getAttribute('clientWidth'));
svg.setAttribute('height', svg.getAttribute('clientHeight'));