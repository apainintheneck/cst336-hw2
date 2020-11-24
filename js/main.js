/*global $*/
/*global Image*/
/*global URL*/
$(document).ready(function(){
    $("#imgErrAlert").hide(); //Hide alert on startup.
    
    //Show intro modal on startup for new users.
    if(!sessionStorage.prevUser){
        $("#introModal").modal("show");
        sessionStorage.prevUser = true;
    }

    //Global variables
    var imgSrc = "https://picsum.photos/500";
    var cssStyles = ""; //Holds CSS clipboard text.
    var inlineHTML = ""; //Holds HTMl clipboard text.
    var isUpload = false; //Boolean for if the image was uploaded.
    var fileName = ""; //Holds the file name of the uploaded image.
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
    $("#enter-url").on("submit", function(event) {
        event.preventDefault();
        
        //Check image url 
        let url = $("#img-url").val();
        if(url === ""){
            $("#imgErrAlert").hide();
            return;
        }
        
        testImageUrl(url, imageUrlError(), function() { isUpload = false; changeImage(); });
    });
    $("#upload-img").on("change", function(){
        if($(this).prop('files').length > 0){
            $("#upload-label").html($(this)[0].files[0].name);
        } else {
            $("#upload-label").html("Choose file to upload...");
        }
    });
    $("#upload-btn").click(function() {
        if($("#upload-img").prop('files').length > 0){
            let url = URL.createObjectURL($("#upload-img")[0].files[0]);
            testImageUrl(url, imageUploadError(), function() { isUpload = true; changeImage(); });
        } else {
            $("#upload-label").html("Choose file to upload...");
        }
    });
    $("#submit-btn").click(applyStyles);
    $("#reset-btn").click(resetStyles);
    $("#info-btn").click(function(){
        //Show intro modal.
        $("#introModal").modal("show");
    });
    $("#copy-css").click(function(){
        //Copy CSS textbox
        $("#css-text").select();
        document.execCommand("copy");
    });
    $("#copy-html").click(function(){
        //Copy HTML textbox
        $("#html-text").select();
        document.execCommand("copy");
    });
    
    
    //Functions
    function changeImage(){
        $("#original-img").attr("src", imgSrc);
        $("#edited-img").attr("src", imgSrc);
        
        $("#imgErrAlert").hide();
        
        //Update file name if image was uploaded.
        if(isUpload){
            fileName = $("#upload-img")[0].files[0].name;
            $("#upload-label").html(fileName);
        }
        
        buildInlineHTML();
    }
    
    function imageUrlError(){
        $("#imgErrAlert").html("<b>Error:</b> Unable to load image at url: " + $("#img-url").val()
            + "<br>Try another one.");
        $("#imgErrAlert").show();
        
        $("#img-url").val("");
    }
    
    function imageUploadError(){
        $("#imgErrAlert").html("<b>Error:</b> Unable to load file: " + $("#upload-img")[0].files[0].name
            + "<br>Try another one.");
        $("#imgErrAlert").show();
        
        $("#upload-label").html("Choose file to upload...");
    }
    
    //testImageUrl() based upon: https://stackoverflow.com/a/9714891
    function testImageUrl(url, err, res){
        let timeout = 5000;
        var timedOut = false, timer;
        var img = new Image();
        img.onerror = img.onabort = function() {
            if (!timedOut) {
                clearTimeout(timer);
                err();
            }
        };
        img.onload = function() {
            if (!timedOut) {
                clearTimeout(timer);
                imgSrc = url;
                res();
            }
        };
        img.src = url;
        timer = setTimeout(function() {
            timedOut = true;
            err();
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
    
    buildInlineHTML(); //Build first time with the default image address.
    
    //Create HTML string to copy to clipboard.
    function buildInlineHTML(){
        let htmlFormat;
        let src;
        
        //If image is uploaded, use filename for src instead of generated url.
        if(isUpload){
            src = fileName;
        } else {
            src = imgSrc;
        }
        
        //Only insert styles into html tag if they have been added by the user.
        if(cssStyles !== ""){
            htmlFormat = ["<img src='", src, "' style='", cssStyles, "'>"];
        } else {
            htmlFormat = ["<img src='", src, "'>"];
        }
        
        inlineHTML = "";
        
        for(let i = 0; i < htmlFormat.length; i++){
            inlineHTML += htmlFormat[i];
        }
        
        $("#html-text").val(inlineHTML);
    }
    
})