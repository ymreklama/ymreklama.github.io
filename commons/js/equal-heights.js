$(function() {
  $(".footer .row").matchHeight();
  $(".columns.sr .col5").matchHeight();
  $(".columns .equal").matchHeight();
  $(".tab-block-item").matchHeight();
  $(".columns.sr .col5").matchHeight();
  $(".tab-block h5").matchHeight();
  $(".product-part").matchHeight();

  $(window).resize(function() {
    setTimeout(function() {
      $.fn.matchHeight._update();
    }, 200)
  });
});



