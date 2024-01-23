/* MENU BURGER */

$(".menu-burger").on("click", function () {
  $(this).toggleClass("active");
  $(".menu-nav").toggleClass("open");
});

/* SLIDER (Site development) */

$(document).ready(function(){
  var screenWidth = $(window).width();
  var $siteDevContent = $('#site-development-container .site-dev-content');
  var itemCount = $siteDevContent.find('.dev-content-item').length;

  function initializeSlider() {
    // var $siteDevContent = $('#site-development-container .site-dev-content');
    // var itemCount = $siteDevContent.find('.dev-content-item').length;

    // Adjust these settings based on your requirements
    $siteDevContent.slick({
      slidesToShow: itemCount > 3 ? 3 : (screenWidth < 600 ? 1 : 2),
      arrows: false,
      dots: true,
      slidesToScroll: 1,
      infinite: true,
      initialSlide: 0,
    });
  }

  function destroySlider() {
    $('#site-development-container .site-dev-content').slick('unslick');
  }

  // Initial setup
  if (screenWidth < 850 || itemCount > 3) {
    initializeSlider();
  }

  // Update on window resize
  $(window).resize(function() {
    screenWidth = $(window).width();

    if (screenWidth < 850 || itemCount > 3) {
      if ($('#site-development-container .site-dev-content').hasClass('slick-initialized')) {
        destroySlider();
      }
      initializeSlider();
    } else {
      if ($('#site-development-container .site-dev-content').hasClass('slick-initialized')) {
        destroySlider();
      }
    }
  });
});


/* SLIDER (Site development) */

$(document).ready(function(){
  $('#student-feedback-container .feedback-content').slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    // adaptiveHeight: true,
    slidesToScroll: 1,
    infinite: true,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 10000,
    fade: true,
    cssEase: "linear",
  });
  
});