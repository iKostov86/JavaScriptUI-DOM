function solve() {
    return function () {
        $.fn.listview = function (data) {
            var $this = this;
            var dateAttr = $this.data('template');
            var htmlTemplate = $('#' + dateAttr).html();
            var template = '{{#each this}}' + htmlTemplate + '{{/each}}';

            //var template = handlebars.compile(htmlTemplate);
            var compileTemplate = handlebars.compile(template);

            //for (var i = 0; i < data.length; i += 1) {
            //    var result = template(data[i]);
            //    $this.append(result);
            //}

            var result = compileTemplate(data);
            $this.append(result);

            return this;
        };
    };
}

module.exports = solve;