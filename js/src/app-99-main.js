/** ========================
============================
@project    : Vorttex
@version    : 1.0
@author     : Thiago Aguiar - thiago.aguiar86@gmail.com
@copyright  : 2016
============================
@begin
=========================**/

// feature gallery swipe plugin
var swiper = new Swiper('.swiper-container', {
      pagination: '.navigation',
      paginationClickable: true,
      spaceBetween: 0,
      loop: true,
   keyboardControl: true
});

// change language page
var chooseLang = {
   init: function() {
      this.engine();
   },
   engine: function() {
      var boxLang = $('header .lang div');
      var element = boxLang.find('a.type');
      var box = boxLang.find('ul');

      $(document).on({
         click: function(event) {
            var target = $(event.target);

            if(target.is('header .lang div a')) {

               if(target.hasClass('type') == true) {
                  if(element.hasClass('open') == true) {
                     console.log('close');
                     element.removeClass('open');
                     box.css('display', 'none');
                  } else {
                     console.log('open');
                     element.addClass('open');
                     box.css('display', 'block');
                  }               
               }               
            } else {
               element.removeClass('open');
               box.css('display', 'none');
            }
         }
      });
   }
}

// chooseMobileMenu
var chooseMobileMenu = {
   init: function() {
      this.engine();
   },
   engine: function() {
      var element = $('header .menu .list');
      var box = $('header .menu nav ul');
      var screen  = $(window);

      element.on({
         click: function() {
            if($(this).hasClass('open') == true) {
               $(this).removeClass('open');
               box.css('display', 'none');
            } else {
               $(this).addClass('open');
               box.css('display', 'block');
            }
         }
      });

      screen.on({
         resize: function() {          
            var getPos = $(this).width();

            if(getPos >= 768) {
               element.removeClass('open');
               box.css('display', 'block');
            } else if(getPos < 768) {
               element.removeClass('open');
               box.removeAttr('style');
            }
         }
      }).resize();
   }
}

// execute functions
chooseLang.init();
chooseMobileMenu.init();

/** ========================
end
=========================**/