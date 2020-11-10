/*global $*/
/*global Image*/
$(document).ready(function(){
    
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
    
    //Functions
    function changeImage(url){
        $("#original-img").attr("src", url);
        $("#edited-img").attr("src", url);
        
        imgSrc = url;
    }
    
    function imageUrlError(url){
        $('#img-url').val("");
        
        
    }
    
    function testImage() {
        //Check image url 
        let url = $("#img-url").val();
        if(url === "") return;
        
        let timeout = 5000;
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
    }
    
    function buildInlineHTML(){
        let htmlFormat;
        if(cssStyles !== ""){
            htmlFormat = ["<img src='", imgSrc, "' style='", cssStyles, "'>"];
        } else {
            htmlFormat = ["<img src='", imgSrc, "'>"];
        }
        
        inlineHTML = "";
        
        for(var str in htmlFormat){
            inlineHTML += str;
        }
    }
    
})