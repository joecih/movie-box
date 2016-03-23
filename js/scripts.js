$(document).ready(function() {
    $('#movie-search-form').submit(function() {

        var movieSearchTerm = $('#movieInput').val();
        var _baseURL = 'https://api.themoviedb.org/3/';
        var _apiKey = "?api_key=24f6a4a3dd56153bb0f7f696f167fc5b"; // Joes key
        var _configureURL = _baseURL + 'configuration' + _apiKey;
        var _nowPlaying = _baseURL + 'movie/now_playing' + _apiKey;
        var _imagePath;

        // var searchURL =
        // 	'http://api.themoviedb.org/3/search/movie/now_playing?query='+movieSearchTerm+'&api_key=24f6a4a3dd56153bb0f7f696f167fc5b';
        $.getJSON(_configureURL, function(_configData) {
            console.log(_configData);
            _imagePath = _configData.images.base_url;
            //console.log(_imagePath);

        });

        $.getJSON(_nowPlaying, function(movieData) {
            console.log(movieData.results);

            var _movieListItems = "";
            var _addRows = "";
            var _count = 0;
            var _rowCnt = 1;
            var _aHoldHTML = [];


            for (i = 0; i < movieData.results.length; i++) {
                var title = movieData.results[i].title;
                var overview = movieData.results[i].overview;
                var posterPath = movieData.results[i].poster_path;
                var releaseDate = movieData.results[i].release_date;
                var _title = movieData.results[i].original_title;
                var _description = movieData.results[i].overview;

                if (posterPath != null) {

                    _movieListItems += '<div class="movie w3-quarter">';
                    _movieListItems += '<div class="movie-card">';
                    _movieListItems += '<img class="movie-images w3-padding" style="width:100%" src="' + _imagePath + 'w185/' + posterPath + '">';
                    // _movieListItems += '<div class="w3-container cards">';
                    // _movieListItems += '<div class="movie-title"><h4><b>' + _title + '</b></h4></div>';
                    // _movieListItems += '<div class="movie-description"><p>'+ _description + '</p></div>';
                    // _movieListItems += '</div>';
                    _movieListItems += '</div>';
                    _movieListItems += '</div>';


                    // Add a new row each 4th images
                    if (_count == 4) {

                        $('#now-playing-wrapper').append('<div class="w3-row-padding w3-margin-top" id="image-row' + _rowCnt + '"></div>');

                        for (b=0; b < _aHoldHTML.length; b++) {
                            $("#image-row" + _rowCnt).append(_aHoldHTML[b]);
                        }

                        //console.log(_aHoldHTML.length + " | " + _count + " | " + _rowCnt);

                        _count = 0; // reset
                        _rowCnt++;
                        _aHoldHTML.length = 0; // Clear array
                    }
                    
                    _aHoldHTML.push(_movieListItems); // push 4 items to hold array
                    _movieListItems = ""; // Reset the html template
                    _count++;
                }

            }

            //$('#now-playing-wrapper').html(movieHTML);

            console.log(_aHoldHTML);

        });

        event.preventDefault();
    });

});

function myFunction() {
    document.getElementById("demo").classList.toggle("w3-show");
}