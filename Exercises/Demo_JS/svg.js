var svg = document.getElementById('the-svg');
var svgNS = 'http://www.w3.org/2000/svg';
var circle = document.createElementNS(svgNS, 'circle');
var directionX = true;
var directionY = true;

circle.setAttribute('cx', '0');
circle.setAttribute('cy', '500');
circle.setAttribute('r', '5');
circle.setAttribute('fill', 'none');
circle.setAttribute('stroke', 'blue');
circle.setAttribute('stroke-width', '50px');

svg.appendChild(circle);

function animeFrame() {
	var cx = +circle.getAttribute('cx');
	var cy = +circle.getAttribute('cy');
	var r = +circle.getAttribute('r');
	
	if (cx > window.innerWidth) {
		directionX = false;
	} else if (cx < 0) {
		directionX = true;
	}
	
	if (directionX) {
		circle.setAttribute('cx', cx + 5 + '');
	} else {
		circle.setAttribute('cx', cx - 5 + '');
	}
	
	if (cy > window.innerHeight) {
		directionY = false;
	} else if (cy < 0) {
		directionY = true;
	}
	
	if (directionY) {
		circle.setAttribute('cy', cy + 5 + '');
	} else {
		circle.setAttribute('cy', cy - 5 + '');
	}
	
	if (r > svg.width / 2 || r > svg.clientHeight / 2) {
		circle.setAttribute('r', '0');
	} else {
		circle.setAttribute('r', r + 0.5 + '');
	}
	
	requestAnimationFrame(animeFrame);
}

animeFrame();