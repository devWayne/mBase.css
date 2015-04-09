 !function($) {

     var $window = $(window);
     var $body = $(document.body);
     $body.scrollspy({
         target: '.sidebar',
         offset: 20 // required to select the right thing. if this is smaller then you are at the top of one section
             // but the next section is highlighted
     });

    $window.on('load', function () {
      $body.scrollspy('refresh')
    });
 }(jQuery)
