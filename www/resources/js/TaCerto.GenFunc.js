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
    transformParse: function(el){
        console.log(getComputedStyle(el).transform);
        var matrixVal = getComputedStyle(el).transform.replace(/matrix\(/ig, '').replace(/matrix3D\(/ig, '').replace(/\)/ig, '').replace(/ /g,'').split(','); //matrix!
        var matrixName = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY'];
        console.log(matrixVal);
        console.log(matrixName);
        var matrixEl = {};
        //matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
        function element(name, value){
            this.name = name;
            this.value = value;
            this.toString = ()=>{
                return this.name + "(" + this.value + ")";
            };
        }

        for (let i = 0; i < matrixName.length; i++) {
            matrixEl[matrixName[i]] = new element(matrixName[i], matrixVal[i]);
        }
        return matrixEl;
    },
    __filterParse: function(el){
        var filter = getComputedStyle(el).filter;
        var filterTypes = ["blur", "brightness", "contrast", "drop-shadow", "grayscale", "hue-rotate", "invert", "opacity", "saturate", "sepia"];
        var filterValues = {};

        for (let j = 0; j < filterTypes.length; j++) {
            filterValues[j] = filterTypes[j];
            filterValues[filterTypes[j]] = "";
            var auxFilter = filterTypes[j] + "(";
            var auxFilterReg = filterTypes[j] + "\\(";

            var filterSubstring = filter.split(auxFilter)[1];
            var inicio = filter.search(auxFilterReg) + auxFilter.length;
            //console.log("o: "+filter.search(auxFilterReg) + " t: " + auxFilter.length + " i: " + inicio);
            //if(filter.search(auxFilterReg) > -1)
            //    console.log(filterSubstring);
            var fim = inicio;
            var searchClose = 1;
            if(filterSubstring !== undefined){
                for (let i = inicio; i < filter.length; i++) {
                    if(searchClose === 1 && filter[i] === ")")
                        break;
                    else
                        fim++;
                    if(filter[i] === "(")
                        searchClose++;
                    else if(filter[i] === ")")
                        searchClose--;
                }
                filterValues[filterTypes[j]] = filter.substring(inicio, fim);
            }
        }
        return filterValues;
    },
};