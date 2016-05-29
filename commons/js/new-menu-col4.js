$(document).ready(function() {

  // Accordion
  var accordionMenus = document.querySelectorAll('.accordion_menu'),
      accordionMenu,
      accordionFirstItem,
      activeClass;

  for(var i = 0; i < accordionMenus.length; i++) {

    accordionMenu = accordionMenus[i];
    accordionFirstItem = accordionMenu.querySelector('.accordion_menu__item'),
    activeClass = 'active';

    if (accordionFirstItem.classList) {
      accordionFirstItem.classList.add(activeClass);
    } else {
      accordionFirstItem.className += ' ' + activeClass;
    }

    accordionFirstItem.querySelector('.accordion_menu__content').style.display = 'block';
  }

  $('.accordion_menu__link').click(function(e) {
    e.preventDefault();

    var item = $(this).closest('.accordion_menu__item');

    if (!$(item).hasClass('active')) {
      $(item)
        .siblings()
        .removeClass('active')
        .find('.accordion_menu__content')
        .stop(true, true)
        .slideUp(200);
      $(item).addClass('active').find('div').stop(true, true).slideDown(200);
    } else {
      $(item).removeClass('active').find('div').stop(true, true).slideUp(200);
    }
    setTimeout(function() {
      matchHeight();
    },200);
  });

  // Navigation
  $('.main-item__title').on('click', mobileMenu);

  $(document).click(function(event) { 
    if(!$(event.target).is('.main-item__title') && window.innerWidth < 768) {
      $('.main-item').removeClass('active');
      $('.inner-list__wrapper.active').stop(true, true).slideUp(400);
    }        
  })

  var mainItems = document.querySelectorAll('.main-item_new');
  for(var i = 0; i < mainItems.length; i++) {
    showMenu($(mainItems[i].querySelector('.inner-list__wrapper')));
  }

  $('.inner-item')
  .on('mouseenter', function() {
    hoverMenu($(this));
  }).
  on('mouseleave', function() {
    unhoverMenu($(this));
  });
  $('.main-item').on('mouseenter', function() {
    setTimeout(matchHeight, 0);
  });
  $('.inner-link').on('mouseenter', matchHeight);
    
  $('.inner-link').click( function(e) {
    if (!$('html').hasClass('mobile')) {
      e.preventDefault();

      var $menuItem = $(this).closest('.inner-item');

      activateParentsMenuItems($menuItem);
      showMenu($menuItem);
    }
  });

  function activateParentsMenuItems($activeItem) {
    var $activeItemParent = $activeItem.closest('.inner-list').closest('.inner-item'),
        $activeItemParentSiblings = $activeItemParent.siblings('.inner-item');

    if($activeItemParent.length) {
      $activeItemParentSiblings.removeClass('active');
      $activeItemParent.addClass('active');

      activateParentsMenuItems($activeItemParent);
    }
  }

  function showMenu($menuParent) {
    var $menuParentSiblings = $menuParent.siblings(),
        $menu = $menuParent.children('.inner-list'),
        $menuChildren = $menu.children('.inner-item'),
        $menuFirstChild = $menuChildren.first();

    $menuParentSiblings.find('.inner-item').removeClass('active');
    $menuParentSiblings.removeClass('active');
    $menuParent.addClass('active');
    matchHeight();

    if($menuChildren.length) {
      $menuFirstChild.addClass('active');
      showMenu($menuFirstChild);
    }
  }
  function hoverMenu($menuParent) {
    var $menuParentMenu = $menuParent.closest('.inner-list'),
        $menuParentSiblings = $menuParent.siblings('.inner-item'),
        $menu = $menuParent.children('.inner-list'),
        $menuChildren = $menu.children('.inner-item'),
        $menuFirstChild = $menuChildren.first();

    $menuParentSiblings.removeClass('hover');
    $menuParentMenu.addClass('hovered');
    $menuParent.addClass('hover');
    matchHeight();

    if($menuChildren.length) {
      hoverMenu($menuFirstChild);
    }
  }
  function unhoverMenu($menuParent) {
    var $menuParentMenu = $menuParent.closest('.inner-list'),
        $menu = $menuParent.children('.inner-list'),
        $menuChildren = $menu.children('.inner-item'),
        $menuFirstChild = $menuChildren.first();

    $menuParentMenu.removeClass('hovered');
    $menuParentMenu.find('.inner-list').removeClass('hovered');
    $menuParent.removeClass('hover');
    $menuParent.find('.inner-item').removeClass('hover');
    matchHeight();
  }

  function matchHeight($type) {
    if(!$('html').hasClass('mobile')) {
      var heights = [];
      var $itemToCheckHeight = $('.inner-list.hovered, .inner-list.active, .inner-list_depth-3.active .inner-item_depth-3.active .accordion_menu, .inner-list_depth-3.hovered .inner-item_depth-3.hover .accordion_menu');
      if ($itemToCheckHeight.length < 4) {
        $itemToCheckHeight = $('.inner-list__wrapper.active > .inner-list, .inner-list__wrapper.active .inner-item.active > .inner-list');
      }
      $itemToCheckHeight.each(function() {
        heights.push($(this).height());
      });
      var maxHeight = Math.max.apply(null,heights);
      $('.inner-list__wrapper').height(maxHeight);
    }
  }

  
  mobile();
  $(window).resize(mobile);

  function mobileMenu (e) {
    e.preventDefault();
    e.stopPropagation();
    if(window.innerWidth < 768) {
      var clickedElement = $(this).closest('.main-item');
      var childMenu = clickedElement.find('.inner-list__wrapper');


      $('.main-item').not(clickedElement).removeClass('active');
      clickedElement.addClass('active');
      $('.inner-list__wrapper').not(childMenu).slideUp(400);
      childMenu.slideToggle(400);
    } 
  }
  function mobile() {
    if(window.innerWidth < 768) {
      $('html').addClass('mobile');
      $('.inner-list__wrapper').css('height', '');
    } else {
      $('html').removeClass('mobile');
      $('.main-item').removeClass('active');
      $('.inner-list__wrapper').css('display', '');
    }
  }
});