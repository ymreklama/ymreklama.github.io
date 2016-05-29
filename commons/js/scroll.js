$(function() {
  // Custom scrollbar
  if(window.innerWidth >= 768) {
    $('.scroll').jScrollPane();
  } else {
    $('.scroll').jScrollPane().data().jsp.destroy();
  }
   
  $(window).resize(function() {
      if(window.innerWidth >= 768) {
        $('.scroll').jScrollPane();
      } else {
        $('.scroll').jScrollPane().data().jsp.destroy();
      }
    });
});