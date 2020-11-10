/*global $*/
/*global Image*/
$(document).ready(function(){
    $("#imgErrAlert").hide();

    //Global variables
    var imgSrc = "https://picsum.photos/500";
    var cssStyles = "";
    var inlineHTML = "";
    //Create dict with CSS filter attributes.
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
        
        $("#imgErrAlert").html("<b>Error:</b> Unable to load image at url: " + url
            + "<br>Try another one.");
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
    
    //Applies style changes to image and builds CSS and HTML based upon those styles.
    function applyStyles(){
        let styleStr = "";
        
        //Loop through filterStyles dict and add each non-empty style to string.
        for(var index in filterStyles){
            let inputVal = $("#" + index).val();
       
            if(inputVal !== ""){
                filterStyles[index] = "(" + inputVal + ")";
                styleStr += " " + index + filterStyles[index];
            } else {
                filterStyles[index] = "";
            }
        }
        
        //Apply CSS changes to image.
        $("#edited-img").css("filter", styleStr);
        
        buildCSS(styleStr);
        buildInlineHTML();
    }
    
    //Reset styles applied to image, CSS and HTML strings, error alerts, and all dropdown menus.
    function resetStyles(){
        for(var index in filterStyles){
            filterStyles[index] = "";
            $("#" + index).val("");
        }
        
        $("#edited-img").css("filter", "none");
        
        buildCSS("");
        buildInlineHTML();
        
        $("#imgErrAlert").hide();
    }
    
    //Create CSS string to copy to clipboard.
    function buildCSS(filterStyles){
        if(filterStyles !== ""){
            cssStyles = "filter:" + filterStyles + ";";
        } else {
            cssStyles = "";
        }
        
        $("#css-text").val(cssStyles);
    }
    
    //Create HTML string to copy to clipboard.
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