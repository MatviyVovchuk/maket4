/* MENU BURGER */

$(".menu-burger").on("click", function () {
  $(this).toggleClass("active");
  $(".menu-nav").toggleClass("open");
});

/* SLIDER (Site development) */

$(document).ready(function(){

  // $(".site-dev-content").slick({
  //   dots: false,
  //   infinite: true,
  //   arrows: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 851,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         arrows: false,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 601,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: true,
  //         arrows: false,
  //       },
  //     },
  //   ],
  // });
  
  var screenWidth = $(window).width();

  function initializeSlider() {
    // Adjust these settings based on your requirements
    $('#site-development-container .site-dev-content').slick({
      slidesToShow: screenWidth < 600 ? 1 : 2,
      arrows: false,
      dots: true,
      // adaptiveHeight: true,
      slidesToScroll: 1,
      infinite: true,
      initialSlide: 0,
      // autoplay: true,
      // autoplaySpeed: 2000,
      // Add other Slick settings as needed
    });
  }

  function destroySlider() {
    $('#site-development-container .site-dev-content').slick('unslick');
  }

  // Initial setup
  if (screenWidth < 850) {
    initializeSlider();
  }

  // Update on window resize
  $(window).resize(function() {
    screenWidth = $(window).width();

    if (screenWidth < 850) {
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