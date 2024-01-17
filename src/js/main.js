/* MENU BURGER */

$(".menu-burger").on("click", function () {
  $(this).toggleClass("active");
  $(".menu-nav").toggleClass("open");
});