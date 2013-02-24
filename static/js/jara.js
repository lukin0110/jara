(function(){
    // Hello world
    var Jara = {};

    function fixHeight(){
        $('#welcome, #welcome2').css('height', $(window).height()).removeClass('intro');
        //console.log("Height = " + $(window).height());
    }

    Jara.init = function(){
        $('#p1').parallax("0%", 0.5);
        $('#p2').parallax("0%", 0.2);
        $('#p3').parallax("0%", 0.2);

        fixHeight();
        $(window).resize(fixHeight);
    };

    Jara.scrollTo = function(anchor){
        var aTag = $("a[name='"+ anchor +"']");
        $('html,body').animate({scrollTop: aTag.offset().top-200},1500);
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