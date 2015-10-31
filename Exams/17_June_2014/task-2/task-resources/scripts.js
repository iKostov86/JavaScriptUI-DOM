/* globals $ */
$.fn.gallery = function (col) {
    var $this = this;
    var $galleryList = $this.children('.gallery-list');
    var $selected = $this.children('.selected');
    var $imageContainers = $galleryList.children('.image-container');
    var $currentImage = $selected.children('.current-image');
    var $nextImage = $selected.children('.next-image');
    var $previousImage = $selected.children('.previous-image');

    col = col || 4;
    $this.addClass('gallery');
    $imageContainers.css('cursor', 'pointer');
    $selected.css('cursor', 'pointer');
    $selected.hide();

    $imageContainers.each(function (index, item) {
        var $item = $(item);
        if (((index) % col) === 0) {
            $item.addClass('clearfix');
        }
    });

    $galleryList.on('click', '.image-container', function () {
        var $self = $(this);
        var $next = $self.next();
        var $previous = $self.prev();

        $selected.show();

        $galleryList
            .addClass('blurred')
            .append($('<div />')
                .addClass('disabled-background'));

        if (!$next.length) {
            $next = $imageContainers.first();
        }

        if (!$previous.length) {
            $previous = $imageContainers.last();
        }

        setImageInfo($currentImage, $self);
        setImageInfo($nextImage, $next);
        setImageInfo($previousImage, $previous);

        function setImageInfo($selfImage, $self) {
            $selfImage
                .find('img')
                .attr('src', $self
                    .find('img')
                    .attr('src'))
                .attr('data-info', $self
                    .find('img')
                    .data('info'))
        }
    });

    $currentImage.on('click', function () {
        $galleryList
            .removeClass('blurred')
            .children('.disabled-background')
            .remove();

        $selected.hide();
    });

    $nextImage.on('click', changeCurrentImage);

    $previousImage.on('click', changeCurrentImage);

    function validateIndex(index) {
        if (index < 1) {
            return $imageContainers.length;
        } else if (index > $imageContainers.length) {
            return 1;
        } return index;
    }

    function changeCurrentImage() {
        var $self = $(this);

        var $currentIndex = $self.find('img').attr('data-info') | 0;
        var $current = $imageContainers.find('img').eq($currentIndex - 1);

        var $nextIndex = validateIndex($currentIndex + 1);
        var $next = $imageContainers.find('img').eq($nextIndex - 1);

        var $previousIndex = validateIndex($currentIndex - 1);
        var $previous = $imageContainers.find('img').eq($previousIndex - 1);

        changeImageInfo($currentImage, $current, $currentIndex);
        changeImageInfo($nextImage, $next, $nextIndex);
        changeImageInfo($previousImage, $previous, $previousIndex);

        function changeImageInfo($selfImage, $self, $selfIndex) {
            $selfImage
                .find('img')
                .attr('src', $self.attr('src'))
                .attr('data-info', $selfIndex);
        }
    }

    return this;
};