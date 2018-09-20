var TaCerto = TaCerto || {};
TaCerto.GenFunc = {
    //animated list
    classList: ["animated","bounce", "flash", "pulse", "rubberBand", "shake", "headShake", "swing", "tada", "wobble", "jello", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeIn", "fadeInDown","fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig","flipInX","flipInY","flipOutX","flipOutY","lightSpeedIn","lightSpeedOut","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","rotateOut","rotateOutDownLeft","rotateOutDownRight","rotateOutUpLeft","rotateOutUpRight","hinge","jackInTheBox","rollIn","rollOut","zoomIn","zoomInDown","zoomInLeft","zoomInRight","zoomInUp","zoomOut","zoomOutDown","zoomOutLeft","zoomOutRight","zoomOutUp","slideInDown","slideInLeft","slideInRight","slideInUp","slideOutDown","slideOutLeft","slideOutRight","slideOutUp","heartBeat"],    
    fadeInBtnClick: function(btn, callback, timeout, translatePersonalizado){
        if(!btn){callback(); return;}
        btn.style.transform = "translateY(4px)";
        setTimeout(function(){
            callback();
            btn.style.transform = "translateY(0px)";
        }, !isNaN(timeout) ? timeout : 200);
    },
    translate50: function(btn, callback, timeout){
        if(!btn){callback(); return;}
        btn.style.transform = "translate(0, calc(-50% + 4px))";
        setTimeout(function(){
            callback();
            btn.style.transform = "translate(0, -50%)";
        }, !isNaN(timeout) ? timeout : 200);
    },
    translate5050: function(btn, callback, timeout){
        if(!btn){callback(); return;}
        btn.style.transform = "translate(-50%, calc(-50% + 4px))";
        setTimeout(function(){
            callback();
            btn.style.transform = "translate(-50%, -50%)";
        }, !isNaN(timeout) ? timeout : 200);
    },
    pressClick: function(btn, callback, timeout){
        if(!btn){callback(); return;}
        var img;
        if(btn.style.backgroundImage){
            img = btn.style.backgroundImage;
            img = img.replace('url(','').replace(')','').replace('"','').replace("'",'').replace('"','').replace("'",'').replace('.png','') + "press.png";
            btn.style.backgroundImage = "url("+img+")";
        }
        setTimeout(function(){
            callback();
        }, !isNaN(timeout) ? timeout : 200);
    },
};