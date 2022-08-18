function generateMovie (event){
    //if we want to rework this section using movie_ID from theMOVIEDB, it can be found on the data-title attribute on the poster container $(".card-container")
    var movieTitle = event.target.getAttribute("data-title");
    var requestThemoviedbURL='https://api.themoviedb.org/3/search/movie?api_key='+themoviedbAPIKey+'&query='+movieTitle;
    var requestOmdbURL='https://omdbapi.com/?t='+movieTitle+'&apikey='+omdbAPIKey;
    
    fetch(requestOmdbURL, {
        method: 'GET',
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        localStorage.setItem('OMDB-'+movieTitle,JSON.stringify(data));
        $(document).prop("title", data.Title+" | Flick Genie");
        $("#content").empty();
        $("#content").append(
            //movie card
            $("<div></div>").attr({
                "class":"movieTitlePage col s12",
                "id":"movieTitle"
            }).append(
                $("<div></div>").attr("class","title-page-container").append(
                    $("<div></div>").attr("class","left-panel").append(
                        $("<h3>"+data.Title+"</h3>"),
                        $("<p>IMDB Score: "+data.imdbRating+"</p>").attr("class","imdb-rating"),
                        $("<p>Metascore: "+data.Metascore+"</p>").attr("class","metascore"),
                        $("<p>Rotten Tomatoes: "+data.Ratings[1].Value+"</p>").attr("class","rotten-tomatoes"),
                        $("<p>Rated: "+data.Rated+"</p>").attr("class","rated"),
                        $("<p>Year:"+data.Year+"</p>").attr("class","year"),
                        $("<p>Genre: "+data.Genre+"</p>").attr("class","genre"),
                        $("<p>Actors: "+data.Actors+"</p>").attr("class","actors"),
                        $("<p>Director: "+data.Director+"</p>").attr("class","director")
        ))));
        //geting img and synopsis
        fetch(requestThemoviedbURL, {
            method: 'GET',
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem('themoviedb-'+movieTitle,JSON.stringify(data));
            var posterImg=data.results[0].poster_path;
            $(".left-panel").append(
                $("<h4>synopsis</h4>"),
                $("<p>"+data.results[0].overview+"</p>").attr("class","synopsis")
            );
            $(".title-page-container").append(
                $("<div></div>").attr("class","right-panel").append(
                    $("<img>").attr({
                        "class":"poster-display",
                        "src":"https://image.tmdb.org/t/p/w500/"+posterImg
            })));


        });



    });
    
}