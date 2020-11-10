/*global $*/
$(document).ready(function(){
    
    //Global variables
    const defaultImgSrc = "https://picsum.photos/500";
    var imgSrc = defaultImgSrc;
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
    $("#enter-url").click(changeImage);
    $("#submit-btn").click(applyStyles);
    $("#reset-btn").click(resetStyles);
    
    //Functions
    function changeImage(){
        //Check image url 
        let url = $("#img-url").val();
        
        if(url !== ""){
            $("#original-img").attr("src", url);
            $("#edited-img").attr("src", url);
        }
    }
    
    function imageError(){
        alert( "Error: Failed to load image URL." );
        
        $("#original-img").attr("src", defaultImgSrc);
        $("#edited-img").attr("src", defaultImgSrc);
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
        
        alert("Style string: " + styleStr);
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