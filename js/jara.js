;(function($){
    var Jara = {}, Photos={};

    function fixHeight(){
        $('#welcome').css('height', $(window).height());
        $('#welcome').css('visibility','visible');
        //console.log("Height = " + $(window).height());
    }

    function getTop(anchor){
        var height1 = $(window).height();
        var height2 = $('#' + anchor).outerHeight();

        if(height2>height1 || 'photos' === anchor){
            return 70;
        } else {
            var t = Math.floor((height1 - height2 - 33) / 2);
            //console.log("heights " + t + ", " + height1 + ", " + height2);
            if(t<70) return 70;
            return t;
        } 
    }

    //data-dojo-attach-event="" onclick="$.scrollTo( 'a[name=menu]', 800 );"
    //console.log("Click " + anchor);
    //offset: Number or hash {left: x, top:y }. This will be added to the final position(can be negative).
    function initScroll(){
        var callback = function(e){
            var anchor = $(this).attr('data-scroll');
            $('#header a').removeClass('active');
            $('#header a[data-scroll=' + anchor + ']').addClass('active');
            e.preventDefault();
            $.scrollTo('#' + anchor, 800, {'offset': {'left':0, 'top':-getTop(anchor)}});
        };

        $('[data-scroll]').click(callback);
    }

    Photos.searchWidth = function(item, width){
        var arr = item['images'];
        for(var i=0;i<arr.length;i++){
            var p = arr[i];
            if(p['width'] === width){
                return p;
            }
        }
        return null;
    };

    //Init
    Jara.init = function(){
        $('#p1').parallax("0%", 0.3);
        $('#p2').parallax("0%", 0.2);
        $('#p3').parallax("0%", 0.2);

        // initScroll();
        fixHeight();
        $(window).resize(fixHeight);

        var rest = Math.floor((Math.random()*4)+1);
        $('#welcome').addClass('var'+rest);
    };

    Jara.moreSauce = function(a, event){
        if($(a).attr('shown') === 'true'){
            $('#moresauce').fadeOut();
            $(a).attr('shown', false);      
        } else {
            $('#moresauce').fadeIn();
            $(a).attr('shown', true);
        }
        event.preventDefault();
        return false;
    };

    if(!window.Jara){
        window.Jara = Jara;
    }
})(jQuery);
