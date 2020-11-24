<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title> filter: img styler</title>
        <link href="css/styles.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <script src="js/main.js"></script>
    </head>
    <body class="text-center mx-auto">
        
        <!--
        Introduction Modal that is called on opening the page and
        when the "?" button is clicked.
        -->
        <div class="modal" id="introModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title">filter</h1>
                    </div>
                    <div class="modal-body">
                        Welcome to <b>filter</b> which allows you to test out CSS filters on images and generate the equivalent HTML and CSS.
                        <br><hr>
                        <h5 class="modal-title">Instructions</h5>
                        <hr>
                        <ol type="circle">
                            <li>Enter an image url or upload an image.</li>
                            <li>Apply filters.</li>
                            <li>Copy HTML or CSS to clipboard.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        
        <!--Enter Image URL Card-->
        <div class="card bg-light">
            <div class="card-header">Add Image</div>
            <div class="card-body row">
                <form id="enter-url" class="input-group mb-3 col">
                    <input id="img-url" type="text" class="form-control" placeholder="Enter image url..." aria-label="Image URL" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button type="submit" class="btn btn-outline-secondary">Enter</button>
                    </div>
                </form>
                <div class="input-group mb-3 col">
                  <div class="custom-file">
                    <input id="upload-img" type="file" class="custom-file-input" id="inputGroupFile02">
                    <label id="upload-label" class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose image to upload...</label>
                  </div>
                  <div class="input-group-append">
                    <button id="upload-btn" class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Upload</button>
                  </div>
                </div>
            </div>
        </div>
        
        <!--Image Error Alert-->
        <div id="imgErrAlert" class="alert alert-secondary alert-dismissible">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        </div>
        
        <hr>
        
        <!--Before and after images-->
        <div class="row row-cols-1 row-cols-md-2">
            <div class="card" >
                <img id="original-img" class="card-img-top mx-auto" src="https://picsum.photos/500" alt="Original Image">
                <div class="card-body">
                    <h5 class="card-title">Before</h5>
                </div>
            </div>
            <div class="card" >
                <img id="edited-img" class="card-img-top mx-auto" src="https://picsum.photos/500" alt="Edited Image">
                <div class="card-body">
                    <h5 class="card-title">After</h5>
                </div>
            </div>
        </div>
        
        <hr>
        
        <!--
        Filter Menus: The values for each filter are hard coded into the option value.
        Also includes the "apply changes", "reset", and "?" buttons.
        -->
        <div class="card bg-light">
            <div class="card-header">CSS Photo Styler</div>
            <div id="filters-title" class="card-body">
                <h5 class="card-title">Filters</h5>
            </div>
        </div>
        <div class="card-group">
                  <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Blur:
                            <select id="blur">
                                <option value="">Amount</option>
                                <option value="2px">1</option>
                                <option value="4px">2</option>
                                <option value="6px">3</option>
                                <option value="8px">4</option>
                                <option value="10px">5</option>
                            </select>
                        </h6>
                        <h6 class="card-title">Brightness:
                            <select id="brightness">
                                <option value="">Amount</option>
                                <option value="1.8">4</option>
                                <option value="1.6">3</option>
                                <option value="1.4">2</option>
                                <option value="1.2">1</option>
                                <option value="">0</option>
                                <option value="0.8">-1</option>
                                <option value="0.6">-2</option>
                                <option value="0.4">-3</option>
                                <option value="0.2">-4</option>
                            </select>
                        </h6>
                        <h6 class="card-title">Contrast:
                            <select id="contrast">
                                <option value="">Amount</option>
                                <option value="180%">4</option>
                                <option value="160%">3</option>
                                <option value="140%">2</option>
                                <option value="120%">1</option>
                                <option value="">0</option>
                                <option value="80%">-1</option>
                                <option value="60%">-2</option>
                                <option value="40%">-3</option>
                                <option value="20%">-4</option>
                            </select>
                        </h6>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Grayscale:
                            <select id="grayscale">
                                <option value="">Amount</option>
                                <option value="20%">1</option>
                                <option value="40%">2</option>
                                <option value="60%">3</option>
                                <option value="80%">4</option>
                                <option value="100%">5</option>
                            </select>
                        </h6>
                        <h6 class="card-title">Hue Rotate:
                            <select id="hue-rotate">
                                <option value="">Amount</option>
                                <option value="60deg">1</option>
                                <option value="120deg">2</option>
                                <option value="180deg">3</option>
                                <option value="240deg">4</option>
                                <option value="300deg">5</option>
                            </select>
                        </h6>
                        <h6 class="card-title">Invert:
                            <select id="invert">
                                <option value="">Amount</option>
                                <option value="20%">1</option>
                                <option value="40%">2</option>
                                <option value="60%">3</option>
                                <option value="80%">4</option>
                                <option value="100%">5</option>
                            </select>
                        </h6>
                    </div>
                    <div class="card-footer">
                        <button id="submit-btn" type="button" class="btn btn-outline-secondary">Apply Changes</button>
                        <button id="reset-btn" type="button" class="btn btn-outline-secondary">Reset</button>
                        <button id="info-btn" type="button" class="btn btn-outline-secondary">?</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Opacity:
                            <select id="opacity">
                                <option value="">Amount</option>
                                <option value="90%">1</option>
                                <option value="70%">2</option>
                                <option value="50%">3</option>
                                <option value="30%">4</option>
                                <option value="10%">5</option>
                            </select>
                        </h6>
                        <h6 class="card-title">Saturate:
                            <select id="saturate">
                                <option value="">Amount</option>
                                <option value="150%">1</option>
                                <option value="200%">2</option>
                                <option value="250%">3</option>
                                <option value="300%">4</option>
                                <option value="350%">5</option>
                            </select>
                        </h6>
                        <h6 class="card-title">Sepia:
                            <select id="sepia">
                                <option value="">Amount</option>
                                <option value="20%">1</option>
                                <option value="40%">2</option>
                                <option value="60%">3</option>
                                <option value="80%">4</option>
                                <option value="100%">5</option>
                            </select>
                        </h6>
                    </div>
                </div>
        </div>

        <hr>
        
        <!--Copy to clipboard-->
        <div class="row row-cols-1 row-cols-md-2">
            <div id="copy-card" class="card bg-light">
                <div class="card-header">Copy HTML w/ Inline Style</div>
                <div class="card-body">
                    <div class="input-group mb-3">
                        <input id="html-text" type="text" class="form-control" aria-label="Image URL" aria-describedby="basic-addon2" readonly>
                        <div class="input-group-append">
                            <button id="copy-html" type="button" class="btn btn-outline-secondary">Copy</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="copy-card" class="card bg-light">
                <div class="card-header">Copy CSS</div>
                <div class="card-body">
                    <div class="input-group mb-3">
                        <input id="css-text" type="text" class="form-control" aria-label="Image URL" aria-describedby="basic-addon2" readonly>
                        <div class="input-group-append">
                            <button id="copy-css" type="button" class="btn btn-outline-secondary">Copy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <footer>
            <hr />
            Default image from <a href="https://picsum.photos/">Lorem Picsum</a>.<br>
            CST336 Internet Programming. 2020&copy; Robell<br>
            Find more of my work on <a href="https://github.com/apainintheneck">Github</a>.
            <br><br><br>
        </footer>

    </body>
</html>