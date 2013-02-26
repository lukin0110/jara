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
            var anchor = $(this).attr('data-scroll');
            e.preventDefault();
            $.scrollTo('a[name=' + anchor + ']', 800, {'offset': {'left':0, 'top':-200}});
        });
    }

    Jara.init = function(){
        $('#p1').parallax("0%", 0.5);
        $('#p2').parallax("0%", 0.2);
        $('#p3').parallax("0%", 0.2);

        initScroll();
        fixHeight();
        $(window).resize(fixHeight);
    };

    if(!window.Jara){
        window.Jara = Jara;
    }
})();


/*

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