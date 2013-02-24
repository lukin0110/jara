(function(){
    // Hello world
    var Jara = {};

    Jara.init = function(){
        $(document).ready(function(){
            $('#welcome, #welcome2').height(
                $(window).height()
            );

            $('#p1').parallax("0%", 0.7);
            $('#p2').parallax("50%", 0.5);
            $('#p3').parallax("0%", 0);
        });

        $(window).resize(function(){
            $( '#welcome' ).height(
                $(window).height()
            );
        });
    };

    Jara.scrollTo = function(anchor){
        var aTag = $("a[name='"+ anchor +"']");
        $('html,body').animate({scrollTop: aTag.offset().top-100},1500);
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