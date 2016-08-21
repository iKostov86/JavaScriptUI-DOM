/* globals $ */

// Create a function that takes an id or DOM element and:

//     If an id is provided, select the element
//     Finds all elements with class button or content within the provided element
//         Change the content of all .button elements with "hide"
//     When a .button is clicked:
//         Find the topmost .content element, that is before another .button and:
//             If the .content is visible:
//                 Hide the .content
//                 Change the content of the .button to "show"
//             If the .content is hidden:
//                 Show the .content
//                 Change the content of the .button to "hide"
//             If there isn't a .content element after the clicked .button and before other .button, do nothing
//     Throws if:
//         The provided DOM element is non-existant
//         The id is neither a string nor a DOM element


function solve() {
   return function (selector) {
       var root;

       if (typeof selector === 'string') {
           root = document.getElementById(selector);
       } else if (selector instanceof HTMLElement && selector) {
           root = selector;
       } else {
           throw Error;
       }

       var btns = root.getElementsByClassName('button');
       var contents = root.getElementsByClassName('content');

       for (var i = 0; i < btns.length; i += 1) {
           btns[i].innerHTML = 'hide';
       }

       root.addEventListener('click', function (ev) {
           var target = ev.target;

           if (target.className === 'button') {
               var nextElement = target.nextElementSibling;

               while (nextElement) {
                   if (nextElement.className === 'content') {
                       if (nextElement.style.display === 'none') {
                           nextElement.style.display = '';
                           target.innerHTML = 'hide';
                       } else {
                           nextElement.style.display = 'none';
                           target.innerHTML = 'show';
                       }
                       break;
                   } else if (nextElement.className === 'button') {
                       break;
                   }

                   nextElement = nextElement.nextElementSibling;
               }
           }
       });
   };
}

// function solve() {
//     return function (selector) {
//         var $root;

//         if (typeof selector === 'string') {
//             $root = $('#' + selector);
//         } else if (selector instanceof HTMLElement) {
//             $root = $(selector);
//         } else {
//             throw Error;
//         }

//         if (!$root.length) {
//             throw Error;
//         }

//         var $btns = $root.find('.button');

//         $btns.html('hide');

//         $root.on('click', function (ev) {
//             var $target = $(ev.target);

//             if ($target.hasClass('button')) {
//                 var $nextElement = $target.next();

//                 while ($nextElement) {
//                     if ($nextElement.hasClass('content')) {
//                         if ($nextElement.css('display') === 'none') {
//                             $nextElement.css('display', '');
//                             $target.html('hide');
//                         } else {
//                             $nextElement.css('display', 'none');
//                             $target.html('show');
//                         }

//                         break;
//                     } else if ($nextElement.hasClass('button')) {
//                         break;
//                     }

//                     $nextElement = $nextElement.next();
//                 }
//             }
//         });
//     };
// }

module.exports = solve;