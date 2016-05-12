function sliderStopOnHover() {
  if($(this).find('.active video').length === 0) {
    $(this).trigger('owl.stop');
  }
}

function sliderPlayOnUnhover() {
  if($(this).find('.active video').length === 0) {
    $(this).trigger('owl.play', 5000);
  }
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player( 'player', {
    events: { 'onStateChange': onPlayerStateChange }
  });
}

function onPlayerStateChange(event) {
  $(function() {
    if(event.data === 1) {
      $('.mainslider').trigger('owl.stop');
      $('.mainslider').off('mouseover', sliderStopOnHover);
      $(".mainslider").off('mouseout', sliderPlayOnUnhover);
    } else {
      $('.mainslider').on('mouseover', sliderStopOnHover);
      $(".mainslider").on('mouseout', sliderPlayOnUnhover);
      $('.mainslider').trigger('owl.play', 5000);
    }
  });
}

$(function() {
  var player;

  var tabsTrigger = 0;
  if(window.innerWidth <= 768) {
    var linksReposition = $('.tabs .horizontal .last');
    linksReposition.each(function() {
      var thisRelocate = $(this);
      var idAfter = $(thisRelocate.find('a').attr('href')).prev('.horizontal');
      thisRelocate.prependTo(idAfter);
    });
    tabsTrigger = 1;
  }

  // Language selector
  $('.lang-trigger').click(function() {
    $('.lang-selector').slideToggle(200);
  });

  // Mobile nav
  $('.mobile-menu-trigger').click(function() {
    $('.header .menu .inline').slideToggle(200);
  });

  if(window.innerWidth < 768) {
    $('.parent a').on('click', function (event) {
      event.preventDefault();

      var clickedElement = $(this).closest('.parent').find('.child');
      $('.parent .child').not(clickedElement).css('display', 'none');
      clickedElement.slideToggle();
    });
  }

  // 5 items carousel
  $(".carousel5").owlCarousel({
    items : 5,
    pagination: false,
    navigation :true,
    itemsScaleUp: true,
    rewindNav: false
  });

  // 1 item carousel
  $(".carousel1").owlCarousel({
    singleItem: true,
    pagination: true,
    navigation :false,
    itemsScaleUp: true,
    rewindNav: true,
    autoPlay : true,
    stopOnHover : true,
    rewindSpeed: 1
  });

  // Tabs gallery(4 items default)
  $('.tabs-gallery-carousel').owlCarousel({
    itemsCustom : [
      [0, 1],
      [400, 2],
      [600, 3],
      [800, 4]
    ],
    navigation: true
  });

  /* Sub-menu fix */
  var allWidth;
  var leftSubMenu;
  var widthSubMenu;
  var offsetSubMenu;

  $(window).load(function() {
    allWidth = $(window).width();
    $('.header .menu .submenu').each(function() {
      $(this).css('display', 'block');
      leftSubMenu = $(this).offset().left;
      $(this).css('display', '');
      widthSubMenu = $(this).outerWidth(true);
      offsetSubMenu = allWidth - (leftSubMenu + widthSubMenu);

      if(offsetSubMenu < 0) {
        $(this).css('left', offsetSubMenu);
      }
    });
  });

  $(".basicslider-advanced").owlCarousel({
    singleItem: true,
    navigation :true,
    pagination: true,
    rewindNav: true,
    stopOnHover : true,
    slideSpeed : 300,
    rewindSpeed: 300,
    autoPlay: 5000,
    addClassActive : true,
    afterAction: function(current) {
      current.trigger('owl.play', 5000);
      if(current.find('.active video').length) {
        if(isNaN(versionIE())) {
          current.find('.active .mejs-video').css('display', 'block');
        }
      } else {
        if(isNaN(versionIE())) {
          current.find('.mejs-video').css('display', 'none');
        }
      }
      if(current.find('iframe').length) {
        var slider = document.getElementsByClassName("basicslider")[0];
        var iframe = slider.getElementsByTagName('iframe')[0];
        iframe.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }
      if(current.find('.active video').length) {
        if(isNaN(versionIE())) {
          current.find('.active .mejs-video').css('display', 'block');
        }
        if(videoPlay() === false) {
          current.find('.active video').get(0).load();
          current.find('.active video').get(0).play();
        }
      } else {
        if(isNaN(versionIE())) {
          current.find('.mejs-video').css('display', 'none');
        }
		/* A121 20150408 DM */
		if(current.find('video').length) {
			current.find('video').get(0).pause();
		}
		/* A121 */
      }
    },
    afterInit: function(current) {
      current.find('.owl-wrapper-outer').addClass('autoHeight');
      if(current.find('.active video').length) {
        if(isNaN(versionIE())) {
          current.find('.active .mejs-video').css('display', 'block');
        }
      } else {
        if(isNaN(versionIE())) {
          current.find('.mejs-video').css('display', 'none');
        }
      }
    }
  });

  // Basic slider
  $(".basicslider").owlCarousel({
    singleItem: true,
    navigation :true,
    pagination: true,
    rewindNav: true,
    stopOnHover : true,
    slideSpeed : 300,
    rewindSpeed: 300,
    autoPlay: 5000,
    addClassActive : true,
    afterAction: function(current) {
      current.trigger('owl.play', 5000);
      if(current.find('.active video').length) {
        if(isNaN(versionIE())) {
          current.find('.active .mejs-video').css('display', 'block');
        }
      } else {
        if(isNaN(versionIE())) {
          current.find('.mejs-video').css('display', 'none');
        }
      }
      if(current.find('iframe').length) {
        var slider = document.getElementsByClassName("basicslider")[0];
        var iframe = slider.getElementsByTagName('iframe')[0];
        iframe.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }
    },
    afterInit: function(current) {
      if(current.find('.active video').length) {
        if(isNaN(versionIE())) {
          current.find('.active .mejs-video').css('display', 'block');
        }
      } else {
        if(isNaN(versionIE())) {
          current.find('.mejs-video').css('display', 'none');
        }
      }
    }
  });

  // Top slider basic
  $(".main-basic-slider").owlCarousel({
    singleItem: true,
    navigation :true,
    pagination: false,
    rewindNav: true,
    stopOnHover : true,
    slideSpeed : 300,
    addClassActive : true,
    rewindSpeed: 300,
    afterAction: function(current) {
      if(versionIE() > 8 || versionIE() == false  || isNaN(versionIE())) {
        current.trigger('owl.play', 4900);

        if(current.find('.active video').length) {
          if(isNaN(versionIE())) {
            current.find('.active .mejs-video').css('display', 'block');
          }
          if(videoPlay() === false) {
            current.find('.active video').get(0).load();
            current.find('.active video').get(0).play();
          }
        } else {
          if(isNaN(versionIE())) {
            current.find('.mejs-video').css('display', 'none');
          }
		  /* A121 20150408 DM */
          if(current.find('video').length) {
            current.find('video').get(0).pause();
          }
          /* A121 */
        }
      }
      if(current.find('iframe').length) {
        var slider = document.getElementsByClassName("main-basic-slider")[0];
        var iframe = slider.getElementsByTagName('iframe')[0];
        iframe.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }
    },
    afterInit: function(current) {
      if(current.find('.active video').length) {
        if(isNaN(versionIE())) {
          current.find('.active .mejs-video').css('display', 'block');
        }
      } else {
        if(isNaN(versionIE())) {
          current.find('.mejs-video').css('display', 'none');
        }
      }
    }
  });

  // Main advanced slider
  $(".main-advanced-slider").owlCarousel({
    singleItem: true,
    navigation :true,
    pagination: true,
    rewindNav: true,
    stopOnHover : true,
    slideSpeed : 300,
    addClassActive : true,
    rewindSpeed: 300,
    afterAction: function(current) {
      if(versionIE() > 8 || versionIE() == false || isNaN(versionIE())) {
        current.trigger('owl.play', 4900);

        if(current.find('.active video').length) {
          if(isNaN(versionIE())) {
            current.find('.active .mejs-video').css('display', 'block');
          }
          if(videoPlay() === false) {
            current.find('.active video').get(0).load();
            current.find('.active video').get(0).play();
          }
        } else if(current.find('video').length) {
          if(isNaN(versionIE())) {
            current.find('.mejs-video').css('display', 'none');
          }
		  /* A121 20150408 DM */
		  if(current.find('video').length) {
			current.find('video').get(0).pause();
		  }
		  /* A121 */
        }
      }
      if(current.find('iframe').length) {
        current.find('iframe').height("");
        var slider = document.querySelectorAll(".main-advanced-slider iframe")[0];
        slider.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }
    },
    afterInit: function(current) {
      current.find('.owl-wrapper-outer').addClass('autoHeight');
      if(current.find('.active video').length) {
        if(isNaN(versionIE())) {
          current.find('.active .mejs-video').css('display', 'block');
        }
      } else {
        if(isNaN(versionIE())) {
          current.find('.mejs-video').css('display', 'none');
        }
      }
    }
  });

  if(versionIE() > 8 || versionIE() == false  || isNaN(versionIE())) {
    $('.mainslider video, .basicslider video').on('ended', function() {
      $(this).trigger('owl.next');
      $(this).trigger('owl.play', 5000);
    });
    $('.mainslider video, .basicslider video').on('pause', function() {
      $(this).trigger('owl.play', 5000);
    });
    $('.mainslider video, .basicslider video').on('playing', function() {
      $(this).trigger('owl.stop');
    });

    $('.mainslider, .basicslider').on('mouseover', sliderStopOnHover);
    $(".mainslider, .basicslider").on('mouseout', sliderPlayOnUnhover);

    $(".main-advanced-slider").on('mouseover', function() {
      if($(this).find('.active').find('iframe').length) {
        if(window.innerWidth >= 995) {
          $(this).find('.active').find('iframe').height('480px');
        } else if(window.innerWidth >= 768) {
          $(this).find('.active').find('iframe').height('320px');
        }
      }
      $(".main-advanced-slider").data('owlCarousel').options.autoHeight = true;
      $(".main-advanced-slider").data('owlCarousel').autoHeight();
    });

    $(".main-advanced-slider").on('mouseout', function() {
      if($(this).find('.active').find('iframe').length) {
        $(this).find('.active').find('iframe').height('');
      }
      $(".main-advanced-slider").data('owlCarousel').options.autoHeight = false;
      $('.mainslider .owl-wrapper-outer').css('height', 231);
    });

    $(".basicslider-advanced").on('mouseover', function() {
      if($(this).find('.active').find('iframe').length) {
        if(window.innerWidth >= 995) {
          $(this).find('.active').find('iframe').height('480px');
        } else if(window.innerWidth >= 768) {
          $(this).find('.active').find('iframe').height('320px');
  }
      }
      $(".basicslider-advanced").data('owlCarousel').options.autoHeight = true;
      $(".basicslider-advanced").data('owlCarousel').autoHeight();
    });

    $(".basicslider-advanced").on('mouseout', function() {
      if($(this).find('.active').find('iframe').length) {
        $(this).find('.active').find('iframe').height('');
      }
      $(".basicslider-advanced").data('owlCarousel').options.autoHeight = false;
      $('.basicslider .owl-wrapper-outer').css('height', 231);
    });
  }

  // Placeholders for old browsers
  $('input, textarea').placeholder();

  $(window).resize(function() {
    //Mobile nav on resize
    if(window.innerWidth < 768) {
      $('.parent a').unbind('click');
      $('.parent a').on('click', function (event) {
        event.preventDefault();
        var clickedElement = $(this).closest('.parent').find('.child');
        $('.parent .child').not(clickedElement).css('display', 'none');
        clickedElement.slideToggle();
      });
    } else {
      $('.parent a').unbind('click');
      $('.parent .child').css('display', "");

      //Header nav fix
      $('.header .menu .inline').css('display', "");
    }

    /* Sub menu on resize */
    allWidth = $(window).width();
    $('.header .menu .submenu').each(function() {
      $(this).css('display', 'block');
      $(this).css('left', '0');
      leftSubMenu = $(this).offset().left;
      $(this).css('display', '');
      widthSubMenu = $(this).outerWidth(true);
      offsetSubMenu = allWidth - (leftSubMenu + widthSubMenu);

      if(offsetSubMenu < 0) {
        $(this).css('left', offsetSubMenu);
      }
    });

    if(window.innerWidth < 768) {
      if(tabsTrigger === 0) {
        var linksReposition = $('.tabs .horizontal .last');
        linksReposition.each(function() {
          var thisRelocate = $(this);
          var idAfter = $(thisRelocate.find('a').attr('href')).prev('.horizontal');
          thisRelocate.prependTo(idAfter);
        });
        tabsTrigger = 1;
      }
    } else {
      if (tabsTrigger === 1) {
        var linksReposition = $('.tabs .horizontal .last');
        linksReposition.each(function() {
          var thisRelocate = $(this);
          var relocateBack = thisRelocate.closest('.horizontal').prev('div').prev('.horizontal').find('li');
          thisRelocate.insertAfter(relocateBack);
        });
        tabsTrigger = 0;
      }
    }
  });

  /* A121 20150402 DM */
  $('.horizontal:not(.news) li').click(function() {
    $('html').animate({scrollTop:$(this).offset().top},500);
    $('body').animate({scrollTop:$(this).offset().top},500);
  });
  /* A121 */

function videoPlay() {
  var allVideos = $('body').find('video');
  for(i = 0; i < allVideos.length; i++) {
    if(allVideos[i].paused === false) {
      return true;
    }
  }
  return false;
}

function versionIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
  else                 // If another browser, return 0
    return false;

  return false;
}

  // var closeTab = function() {
  //   var thisRef = $(this).find("a").attr("href");
  //   console.log(thisRef);
  //   $(thisRef).css("display", "none");
  //   $(this).toggleClass("active");
  // };

  // $('.tabs li.active').live('click', closeTab);
  // $('.tabs li:not(li.active)').die('click', closeTab);
});

// $(window).load(function() {
//   $(".carousel").owlCarousel({
//     items : 4,
//     navigation:true,
//     pagination: false,
//     rewindNav: false
//   });
//   $(".carousel_3").owlCarousel({
//     items : 3,
//     itemsDesktopSmall : [1220,3],
//     itemsTablet: [768,3],
//     itemsMobile : [478,1],
//     navigation:true,
//     pagination: false,
//     rewindNav: false
//   });
//     $(".carousel_2").owlCarousel({
//     items : 2,
//     itemsDesktopSmall : [1220,2],
//     itemsTablet: [768,2],
//     itemsMobile : [478,1],
//     navigation:true,
//     pagination: false,
//     rewindNav: false
//   });
//   $('input, select').styler();
//   $(".ajax").colorbox({iframe:true, width: "95%", height: "95%"});
// });

// $(function() {
//     var BV = new $.BigVideo({useFlashForFirefox:false});

//     BV.init();
//     BV.show([
//         { type: "video/mp4",  src: "commons/video/ekp.mp4" },
//         { type: "video/webm", src: "commons/video/ekp.webm" },
//         { type: "video/ogg",  src: "commons/video/ekp.ogv" }
//     ]);
// });

// $(function() {
//   $('a[href*=#]:not([href=#])').click(function() {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//       if (target.length) {
//         $('html,body').animate({
//           scrollTop: target.offset().top
//         }, 1000);
//         return false;
//       }
//     }
//   });

//   var $menuButton = $('#menubtn');
//   var $menu = $('.menu ul');
//   $menuButton.on('click', function(){
//     $menu.slideToggle();
//   });
// });

// $(window).load(function () {
//   var cboxOptions = {
//   width: '95%',
//   height: '1915px',
//   maxWidth: '1015px',
//   maxHeight: '1920px'
// }

//   $('.cboxElement').colorbox(cboxOptions);

//   $(window).resize(function(){
//     $.colorbox.resize({
//       width: window.innerWidth > parseInt(cboxOptions.maxWidth) ? cboxOptions.maxWidth : cboxOptions.width,
//       height: window.innerHeight > parseInt(cboxOptions.maxHeight) ? cboxOptions.maxHeight : cboxOptions.height
//     });
//   });

//   $(document).ready(function (){
//       $('iframe').each(function(){
//       var url = $(this).attr("src")
//       $(this).attr("src",url+"?wmode=transparent")
//       });

//       // begin stick_menu
//        var start_pos=$('#big-video-wrap').offset().top;
//        $(window).scroll(function(){
//         if ($(window).scrollTop()>=start_pos) {
//           if ($('.sticky').hasClass()==false) $('.sticky').addClass('to_top');
//         }
//         else $('.sticky').removeClass('to_top');
//        });
//        // end stick_menu

//   });
// });