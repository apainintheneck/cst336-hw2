/*global $*/
/*global Image*/
$(document).ready(function(){
    $("#imgErrAlert").hide();

    //Global variables
    var imgSrc = "https://picsum.photos/500";
    var cssStyles = "";
    var inlineHTML = "";
    var filterStyles = {
        "blur": "",
        "brightness": "",
        "contrast": "",
        "grayscale": "",
        "hue-rotate": "",
        "invert": "",
        "opacity": "",
        "saturate": "",
        "sepia": "",
    };
    
    //Event listeners
    $("#enter-url").click(testImage);
    $("#submit-btn").click(applyStyles);
    $("#reset-btn").click(resetStyles);
    $("#copy-css").click(function(){
        $("#css-text").select();
        document.execCommand("copy");
    });
    $("#copy-html").click(function(){
        $("#html-text").select();
        document.execCommand("copy");
    });
    
    //Functions
    function changeImage(url){
        $("#original-img").attr("src", url);
        $("#edited-img").attr("src", url);
        
        imgSrc = url;
        $("#imgErrAlert").hide();
        buildInlineHTML();
    }
    
    function imageUrlError(url){
        $("#img-url").val("");
        
        $("#imgErrAlert").html("<b>Error:</b> Unable to load img at url: " + url);
        $("#imgErrAlert").show();
    }
    
    //testImage() based upon: https://stackoverflow.com/a/9714891
    function testImage() {
        //Check image url 
        let url = $("#img-url").val();
        if(url === ""){
            $("#imgErrAlert").hide();
            return;
        }
        
        let timeout = 3000;
        var timedOut = false, timer;
        var img = new Image();
        img.onerror = img.onabort = function() {
            if (!timedOut) {
                clearTimeout(timer);
                imageUrlError(url);
            }
        };
        img.onload = function() {
            if (!timedOut) {
                clearTimeout(timer);
                changeImage(url);
            }
        };
        img.src = url;
        timer = setTimeout(function() {
            timedOut = true;
            imageUrlError(url);
        }, timeout); 
    }
    
    function applyStyles(){
        let styleStr = "";
        
        for(var index in filterStyles){
            let inputVal = $("#" + index).val();
       
            if(inputVal !== ""){
                filterStyles[index] = "(" + inputVal + ")";
                styleStr += " " + index + filterStyles[index];
            } else {
                filterStyles[index] = "";
            }
        }
        
        $("#edited-img").css("filter", styleStr);
        
        buildCSS(styleStr);
        buildInlineHTML();
    }
    
    function resetStyles(){
        for(var index in filterStyles){
            filterStyles[index] = "";
            $("#" + index).val("");
        }
        
        $("#edited-img").css("filter", "none");
        
        buildCSS("");
        buildInlineHTML();
    }
    
    function buildCSS(filterStyles){
        if(filterStyles !== ""){
            cssStyles = "filter:" + filterStyles + ";";
        } else {
            cssStyles = "";
        }
        
        $("#css-text").val(cssStyles);
    }
    
    function buildInlineHTML(){
        let htmlFormat;
        if(cssStyles !== ""){
            htmlFormat = ["<img src='", imgSrc, "' style='", cssStyles, "'>"];
        } else {
            htmlFormat = ["<img src='", imgSrc, "'>"];
        }
        
        inlineHTML = "";
        
        for(let i = 0; i < htmlFormat.length; i++){
            inlineHTML += htmlFormat[i];
        }
        
        $("#html-text").val(inlineHTML);
    }
    
})