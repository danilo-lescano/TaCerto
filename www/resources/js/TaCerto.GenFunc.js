var TaCerto = TaCerto || {};
TaCerto.GenFunc = {
    //animated list
    classList: ["animated","bounce", "flash", "pulse", "rubberBand", "shake", "headShake", "swing", "tada", "wobble", "jello", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeIn", "fadeInDown","fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig","flipInX","flipInY","flipOutX","flipOutY","lightSpeedIn","lightSpeedOut","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","rotateOut","rotateOutDownLeft","rotateOutDownRight","rotateOutUpLeft","rotateOutUpRight","hinge","jackInTheBox","rollIn","rollOut","zoomIn","zoomInDown","zoomInLeft","zoomInRight","zoomInUp","zoomOut","zoomOutDown","zoomOutLeft","zoomOutRight","zoomOutUp","slideInDown","slideInLeft","slideInRight","slideInUp","slideOutDown","slideOutLeft","slideOutRight","slideOutUp","heartBeat"],    
    fadeInBtnClick: function(btn, callback, timeout){
        /*if(!btn){callback(); return;}
        var classList = TaCerto.GenFunc.classList;
        for (let i = 0; i < classList.length; i++) {
            btn.classList.remove(classList[i]);
        }
		setTimeout(function(){
			btn.classList.add("animated", "fadeIn");
        },10);*/
        if(!btn){callback(); return;}
        btn.style.transform = "translateY(4px)";
        setTimeout(function(){
            callback();
            btn.style.transform = "translateY(0px)";
        }, !isNaN(timeout) ? timeout : 200);
    },
    pressClick: function(btn, callback, timeout){
        if(!btn){callback(); return;}
        var img;
        if(btn.style.backgroundImage){
            img = btn.style.backgroundImage;
            img = img.replace('url(','').replace(')','').replace('"','').replace("'",'').replace('"','').replace("'",'').replace('.png','') + "press.png";
            btn.style.backgroundImage = "url("+img+")";
            console.log(btn.style.backgroundImage);
            console.log(img);
            console.log("humhum");
        }
        setTimeout(function(){
            callback();
        }, !isNaN(timeout) ? timeout : 200);
    },
};