$.fn.zoom = function () {
    var $this = $(this.selector);

    $this.on('mouseover', function (ev) {
        var $this = $(this);

        //return string - '100px'
        //var width = $this.css('width');
        //var height = $this.css('height');

        //return value - 100
        var w = $this.width();
        var h = $this.height();

        $this.width(w * 2);
        $this.height(h * 2);
        $this.css({ color: 'yellow' });
    });

    $this.on('mouseout', function (ev) {
        var $this = $(this);

        var w = $this.width();
        var h = $this.height();

        $this.width(w / 2);
        $this.height(h / 2);
        $this.css({color: 'transparent'});
    });

    return $this;
};