// Magnific popup image
$(function() {
  $('.popup-single-image').magnificPopup({
    type: 'image',
    preloader: false,
    image: {
      markup:
        '<div class="mfp-header">'+
          '<div class="mfp-top-bar">'+
            '<div class="mfp-title"></div>'+
            '<div class="mfp-close"></div>'+
          '</div>'+
        '</div>'+
        '<section class="mfp-content-container">'+
          '<div class="mfp-img"></div>'+
        '</section>',
      titleSrc: 'title'
    }
  });

  // Magnific popup youtube video
  $('.popup-youtube').magnificPopup({
    type: 'iframe',
    preloader: false,
    fixedContentPos: false,
    iframe: {
      markup:
      '<header class="mfp-header">'+
        '<div class="mfp-top-bar">'+
          '<div class="mfp-title"></div>'+
          '<div class="mfp-close"></div>'+
        '</div>'+
      '</header>'+
      '<div class="mfp-iframe-scaler">'+
        '<iframe class="mfp-iframe" allowfullscreen></iframe>'+
      '</div>',
      patterns: {
         youtube: {
            index: 'youtube.com/',
            id: 'v=',
            src: 'http://www.youtube.com/embed/%id%?autoplay=1'
        }
      }
    },
    callbacks: {
      markupParse: function(template, values, item) {
       values.title = item.el.attr('title');
      }
    }
  });

/*
  $('.gallery').magnificPopup({
    type: 'image',
    preloader: false,
	gallery: {
		enabled: true
	},
    image: {
      markup:
        '<div class="mfp-header">'+
          '<div class="mfp-top-bar">'+
            '<div class="mfp-title"></div>'+
            '<div class="mfp-close"></div>'+
          '</div>'+
        '</div>'+
        '<section class="mfp-content-container">'+
          '<div class="mfp-img"></div>'+
        '</section>',
      titleSrc: 'title'
    }
  });
*/


/*
var imageConfig = {
	type: 'image',
	preloader: false,
	image: {
	  markup:
		'<div class="mfp-header">'+
			'<div class="mfp-top-bar">'+
				'<div class="mfp-title"></div>'+
				'<div class="mfp-close"></div>'+
			'</div>'+
		'</div>'+
		'<section class="mfp-content-container">'+
			'<div class="mfp-img"></div>'+
		'</section>',
	  titleSrc: 'title'
	}
};

var youtubeConfig = {
	type: 'iframe',
	preloader: false,
	fixedContentPos: false,
	iframe: {
		markup:
		'<header class="mfp-header">'+
		'<div class="mfp-top-bar">'+
			'<div class="mfp-title"></div>'+
			'<div class="mfp-close"></div>'+
		'</div>'+
		'</header>'+
		'<div class="mfp-iframe-scaler">'+
			'<iframe class="mfp-iframe" allowfullscreen></iframe>'+
		'</div>',
		patterns: {
			youtube: {
				index: 'youtube.com/',
				id: 'v=',
				src: 'http://www.youtube.com/embed/%id%?autoplay=1'
			}
		}
	},
	callbacks: {
		markupParse: function(template, values, item) {
			values.title = item.el.attr('title');
		}
	}
};
*/

var galleries = {};
$('.gallery').each(function() {
	var el = $(this);
	var group = el.attr('data-group');

	if(!galleries[group]) {
		galleries[group] = [];
	}
	galleries[group].push(el.get(0));

});

$.each(galleries, function() {

	$(this).magnificPopup({
		preloader: false,
		gallery: {
			enabled: true
		},
		image: {
			markup:
				'<div class="mfp-header">'+
					'<div class="mfp-top-bar">'+
					'<div class="mfp-title"></div>'+
					'<div class="mfp-close"></div>'+
					'</div>'+
				'</div>'+
				'<section class="mfp-content-container">'+
					'<div class="mfp-img"></div>'+
				'</section>',
			titleSrc: 'title',
			type: 'image'
		},
		iframe: {
			markup:
			'<header class="mfp-header">'+
				'<div class="mfp-top-bar">'+
					'<div class="mfp-title"></div>'+
					'<div class="mfp-close"></div>'+
				'</div>'+
			'</header>'+
			'<div class="mfp-iframe-scaler">'+
				'<iframe class="mfp-iframe" allowfullscreen></iframe>'+
			'</div>',
			patterns: {
				youtube: {
					 index: 'youtube.com/',
					 id: 'v=',
					 src: 'http://www.youtube.com/embed/%id%?autoplay=1'
				}
			},
			type: 'iframe'
		},
		inline: {
			markup:
				'<header class="mfp-header">' +
					'<div class="mfp-top-bar">' +
						'<div class="mfp-title"></div>' +
						'<div class="mfp-close"></div>' +
					'</div>' +
				'</header>' +
				'<div class="mfp-video-scaler">' +
					'<video class="mfp-video" preload="auto" type="video/mp4" autoplay="1" controls>' +
						'<object width="900" height="415" type="application/x-shockwave-flash" data="/commons/video/flashfox.swf">' +
							'<param name="movie" value="/commons/video/flashfox.swf" />' +
							'<param name="allowFullScreen" value="true" />' +
							'<param name="wmode" value="transparent" />' +
							'<param name="flashVars" class="mfp-flashVars" />' +
						'</object>' +
					'</video>' +
				'</div>',
			type: 'inline'
		},
		callbacks: {
			elementParse: function(item) {
				//console.log("elementParse", item);
				if(item.el.attr('data-type') == 'video') {
					item.src = null;
				}
			},
			markupParse: function(template, values, item) {
				//console.log('markupParse', item);
				var type = item.el.attr('data-type');
				if(type == 'youtube') {
					values.title = item.el.attr('title');
				} else if(type == 'video') {
					values.title = item.el.attr('title');
					values.video_src = item.el.attr('href');
					values.flashVars_value = "controls=true&amp;src=" + escape(item.el.attr('href'));
				}
			}
		}
	});

});

});