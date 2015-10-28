/* globals $ */

/* Create a function that takes an id or DOM element and: */

function solve() {
    return function (selector) {
        if (typeof selector !== 'string') {
            throw Error;
        }

        var root = document.getElementById(selector);

        if (!root) {
            throw Error;
        }

        var btns = root.getElementsByClassName('button');

        for (var i = 0; i < btns.length; i += 1) {
            btns[i].innerHTML = 'hide';
            btns[i].addEventListener('click', function () {
                
            });
        }
        var contents = root.getElementsByClassName('content');


    };
}

module.exports = solve;