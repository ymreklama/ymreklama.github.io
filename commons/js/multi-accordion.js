
  (function(jQuery){
       jQuery.fn.extend({  
           accordion: function() {       
              return this.each(function() {
                
                var $ul = $(this);
                
          if($ul.data('accordiated'))
            return false;
                            
          $.each($ul.find('ul, li>div'), function(){
            $(this).data('accordiated', true);
            $(this).hide();
          });
          
          $.each($ul.find('li > a'), function(){
            $(this).click(function(e){
              activate(this);
              return false;
            });
          });
          
          var active = $('.active');

          if(active){
            activate(active, 'toggle');
            $(active).parents().show();
          }
          
          function activate(el,effect){
                      if (!effect) {
                $(el)
                         .toggleClass('active')
                         .parent('li')
                         .siblings()
                         .find('a')
                         .removeClass('active')
                         .parent('li')
                         .children('ul, div')
                         .slideUp('fast');
                      }
            $(el)
                    .siblings('ul, div')[(effect || 'slideToggle')]((!effect)?'fast':null);
          }
          
              });
          } 
      }); 
  })(jQuery);

$(function() {
  $('.accordion').accordion();
});