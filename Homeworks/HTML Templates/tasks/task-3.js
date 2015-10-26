function solve() {
    return function () {
        $.fn.listview = function (data) {
            var $this = this;
            var dateAttr = $this.data('template');
            var htmlTemplate = document.getElementById(dateAttr).innerHTML;
            var template = handlebars.compile(htmlTemplate);

            for (var i = 0; i < data.length; i += 1) {
                var result = template(data[i]);
                $this.append(result);
            }

            return this;
        };
    };
}

module.exports = solve;