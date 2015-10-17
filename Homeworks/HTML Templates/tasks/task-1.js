/* globals $ */

function solve() {
    return function (selector) {
        var template =
            '<table class="items-table">' +
                '<thead>' +
                    '<tr>' +
                        '<th>#</th>' +
                        '{{#headers}}' +
                        '<th>{{this}}</th>' +
                        '{{/headers}}' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                    '{{#each items}}' +
                    '<tr>' +
                        '<td>{{@index}}</td>' +
                        '{{#col1}}' +
                        '<td>{{this}}</td>' +
                        '{{/col1}}' +
                        '{{#col2}}' +
                        '<td>{{this}}</td>' +
                        '{{/col2}}' +
                        '{{#col3}}' +
                        '<td>{{this}}</td>' +
                        '{{/col3}}' +
                    '</tr>' +
                    '{{/each}}' +
                '</tbody>' +
            '</table>';

        $(selector).html(template);
    };
}

module.exports = solve;