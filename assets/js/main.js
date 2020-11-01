var scroll,
    mainSlider = $('.mainSlider'),
    caseLogoSlider = $('.caseLogoSlider'),
    numberSlider = $('.numberSlider');


/* IE Popup Start */
function iePopup() {
    if ($("html").hasClass("ie")) {
        $('#iePopup').modal('show');
    }
}
/* IE Popup End */

/* Custom Cursor Start */
function customCursor() {
    var cursor = $(".cursor"),
        follower = $(".cursor-follower");

    var posX = 0,
        posY = 0;

    var mouseX = 0,
        mouseY = 0;

    TweenMax.to({}, 0.010, {
        repeat: -1,
        onRepeat: function () {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;

            TweenMax.set(follower, {
                css: {
                    left: posX - 0,
                    top: posY - 0
                }
            });

            TweenMax.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            });
        }
    });

    $(document).on("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    $("a[href]").on("mouseenter", function () {
        cursor.addClass("hovered");
        follower.addClass("hovered");
    });
    $("a[href]").on("mouseleave", function () {
        cursor.removeClass("hovered");
        follower.removeClass("hovered");
    });
}
/* Custom Cursor End */

/* Page Smooth Scroll Start  */
function pageScroll() {
    scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: $("html").hasClass("ie") ? false : true,
        getDirection: true
    });
    /*scroll.stop();
    $("body").on("mouseenter", ".bootstrap-select .dropdown-menu", function () {
        scroll.stop();
    });
    $("body").on("mouseleave", ".bootstrap-select .dropdown-menu", function () {
        if (scroll && typeof scroll.start !== "undefined") {
            scroll.start()
        }
    });
    scroll.on('scroll', function (obj) {

        var thiss = $('.fixed-header');
        if ((obj.scroll.y) > $(window).height()) {
            thiss.addClass("is-sticky");
        } else {
            thiss.removeClass("is-sticky");
        }
    });
    scroll.on('call', function (func) {
        eval(func)();
        $(document).trigger(func)
    });
    $("a[data-page-scroll-link]").click(function () {
        $("html").addClass("cont-scroll");
        scroll.scrollTo($(this).data("page-scroll-link"), $(this).data("page-scroll-link-offset"), 1000, [0.25, 0.00, 0.35, 1.00], true, function () {
            $("html").removeClass("cont-scroll");
        });
    });*/
}
/* Page Smooth Scroll End  */

/* Main Banner Slider */
function mainBannerSlider(){
    if(mainSlider.length > 0 ){
        mainSlider.slick({
            dots: true,
            appendDots: '.circleBox',
            infinite: false,
            speed: 300,
            arrows: false,
            fade: true,
            swipe: false
        });
    }
}
/* Main Banner Slider */

/* Main Banner Slider */
function caseStudiesLogoSlider(){
    if(caseLogoSlider.length > 0 ){
        caseLogoSlider.slick({
            dots: false,
            infinite: true,
            speed: 300,
            arrows: false,
            slidesToShow: 5
        });
    }
}
/* Main Banner Slider */

/* Main Banner Slider */
function numberSliderFunc(){
    if(numberSlider.length > 0 ){
        numberSlider.slick({
            dots: false,
            infinite: true,
            speed: 300,
            arrows: false,
            slidesToShow: 3
        });
    }
}
/* Main Banner Slider */




$(document).ready(function () {
    customCursor();
    iePopup();
    mainBannerSlider();
    caseStudiesLogoSlider();
    numberSliderFunc();
});
$(window).on('resize', function () {});
$(window).on('load', function () {
    if ($(window).width() > 1199.98) {
        window.dispatchEvent(new Event('resize'));
        pageScroll();
    } else {

    }
    setTimeout(function () {
        scrollTo(0, -1);
    }, 0);
});
$(window).scroll(function () {
    if ($(window).width() <= 1200) {
        var thiss = $('.fixed-header');
        if (($(window).scrollTop()) > $('.hero-text-section').height()) {
            thiss.addClass("is-sticky");
        } else {
            thiss.removeClass("is-sticky");
        }
    }
});
$(document).keydown(function (event) {
    if (event.ctrlKey == true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109' || event.which == '187' || event.which == '189')) {
        event.preventDefault();
    }
});
$(window).bind('mousewheel DOMMouseScroll', function (event) {
    if (event.ctrlKey == true) {
        event.preventDefault();
    }
});