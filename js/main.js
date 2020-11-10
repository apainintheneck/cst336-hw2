/*global $*/
$(document).ready(function(){
    
    //Global variables
    const defaultImgSrc = "https://picsum.photos/500";
    var imgSrc = defaultImgSrc;
    var cssStr = "";
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
        cssStr = "";
        
        for(var index in filterStyles){
            let inputVal = $("#" + index).val();
       
            if(inputVal !== ""){
                filterStyles[index] = "(" + inputVal + ")";
                cssStr += index + filterStyles[index] + " ";
            } else {
                filterStyles[index] = "";
            }
        }
        
        alert("Style string: " + cssStr);
        $("#edited-img").css("filter", cssStr);
    }
    
    function resetStyles(){
        for(var index in filterStyles){
            filterStyles[index] = "";
            $("#" + index).val("");
        }
        
        $("#edited-img").css("filter", "none");
    }
    
    
    
})