(function ($) {
    $.fn.zoom = function (scale) {
        var $this = $(this.selector);

        scale = scale || 2;

        $this.on('mouseover', function (ev) {
            var $this = $(this);

            //return string - '100px'
            //var width = $this.css('width');
            //var height = $this.css('height');

            //return value - 100
            var w = $this.width();
            var h = $this.height();

            $this.width(w * scale);
            $this.height(h * scale);
            $this.css({ color: 'yellow' });
        });

        $this.on('mouseout', function (ev) {
            var $this = $(this);

            var w = $this.width();
            var h = $this.height();

            $this.width(w / scale);
            $this.height(h / scale);
            $this.css({ color: 'transparent' });
        });

        return $this;
    };
}(jQuery))