(function ($) {
    const animEndEv = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend';

    function doAnimations(elems) {
        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation'),
                $delay = $this.data('delay');

            setTimeout(() => {
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            }, $delay || 0);
        });
    }

    //Variables on page load 
    var $myCarousel = $('#the-carousel'),
        $firstAnimatingElems = $myCarousel.find('.carousel-item:first').find("[data-animation ^= 'animated']");

    doAnimations($firstAnimatingElems);

    $myCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });

    // Adding images
    $('.carousel .carousel-item[data-src]').each(function () {
        var $this = $(this);

        $this.prepend([
            '<div style="background-image: url(', $this.attr('data-src'), ')"></div>'
        ].join(''));

    });
})(jQuery);