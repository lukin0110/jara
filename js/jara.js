(function(){
    // Hello world
    var Jara = {};

    function fixHeight(){
        $('#welcome').css('height', $(window).height());
        $('#welcome').css('visibility','visible');
        //console.log("Height = " + $(window).height());
    }

    //data-dojo-attach-event="" onclick="$.scrollTo( 'a[name=menu]', 800 );"
    //console.log("Click " + anchor);
    //offset: Number or hash {left: x, top:y }. This will be added to the final position(can be negative).
    function initScroll(){
        $('[data-scroll]').click(function(e){
            $('#header a').removeClass('active');
            if($(this).parents('#nav').length){
                $(this).addClass('active');
            }

            var anchor = $(this).attr('data-scroll');
            e.preventDefault();
            $.scrollTo('a[name=' + anchor + ']', 800, {'offset': {'left':0, 'top':-200}});
        });
    }

    Jara.init = function(){
        $('#p1').parallax("0%", 0.3);
        $('#p2').parallax("0%", 0.2);
        $('#p3').parallax("0%", 0.2);

        initScroll();
        fixHeight();
        $(window).resize(fixHeight);


        var rest = (new Date().getDay() % 2)+1;
        var rest = Math.floor((Math.random()*4)+1);
        //console.log(rest);
        $('#welcome').addClass('var'+rest);
    };

    if(!window.Jara){
        window.Jara = Jara;
    }
})();




/*
 $(window).scroll(function(){
 var scrollTop = $(window).scrollTop();
 var windowHeight = $(window).height();

 if(windowHeight - scrollTop < 300){
 //$('#header').css('background','rgba(60,0,0,1)');
 } else {
 //$('#header').css('background','none');
 }
 });


<!--
        $('#intro').parallax("50%", 0.1);
    $('#second').parallax("50%", 0.1);
    $('.bg').parallax("50%", 0.4);
    $('#third').parallax("50%", 0.3);


    function stretch_portal_content() {
    if( $(window).height() > $('body').height() ) {
        $( '#portal-content' ).height(
            $(window).height() - ( $('body').height() - $('#portal-content').height() )
        );
    }
}-->
    */


/*
https://graph.facebook.com/518915304826913/photos
http://maps.googleapis.com/maps/api/staticmap?center=51.16150,%205.29631&zoom=15&size=600x400&maptype=roadmap&sensor=true&markers=color:red%7Clabel:J%7C51.16290,%205.29631
http://maps.googleapis.com/maps/api/staticmap?center=51.16150,%205.29631&zoom=15&size=600x400&maptype=roadmap&sensor=true&markers=color:red%7Clabel:J%7C51.16290,%205.29631&format=png
https://developers.google.com/maps/documentation/staticmaps/
*/

