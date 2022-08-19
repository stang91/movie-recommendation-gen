function generateMovie (event){
    //if we want to rework this section using movie_ID from theMOVIEDB, it can be found on the data-title attribute on the poster container $(".card-container")
    var movieTitle = event.target.getAttribute("data-title");
    var requestThemoviedbURL='https://api.themoviedb.org/3/search/movie?api_key='+themoviedbAPIKey+'&query='+movieTitle;
    var requestOmdbURL='https://omdbapi.com/?t='+movieTitle+'&apikey='+omdbAPIKey;
    

     fetch(requestThemoviedbURL, {
        method: 'GET',
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data0) {
        if(data0.results.length!=null){
            var movieID2=data0.results[0].id;
            var requestThemoviedbURL2="https://api.themoviedb.org/3/movie/"+movieID2+"?api_key="+themoviedbAPIKey+"&append_to_response=videos,images,credits,reviews";
            fetch(requestThemoviedbURL2, {
                method: 'GET',
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data1) {
                localStorage.setItem('themoviedb-' + data1.title, JSON.stringify(data1));
                var posterImg = data1.poster_path;
                $(document).prop("title", data1.title + " | Flick Genie");
                $("#content").empty();
                $("#content").append(
                    //movie card
                    $("<div></div>").attr({
                        "class": "movieTitlePage col s12",
                        "id": "movieTitle"
                    }).append(
                        //card info
                        $("<div></div>").attr("class", "title-page-container").append(
                            $("<div></div>").attr("class", "left-panel").append(
                                //title and tagline
                                $("<h3>" + data1.title + "</h3>"),
                                $("<h5>" + data1.tagline + "</h5>"),
                                //info section
                                $("<div></div>").attr("class", "detail-container").append(
                                    $("<p>tmdb Ratings: " + data1.vote_average + "</p>").attr("class", "ratings"),
                                    $("<p>Release Date: " + data1.release_date + "</p>").attr("class", "year"),
                                    $("<p>Run Time: " + data1.runtime + "</p>").attr("class", "runtime")
                                ),
                                //synopsis section
                                $("<h4>synopsis</h4>"),
                                $("<p>" + data1.overview + "</p>").attr("class", "synopsis")
                            ),
                            $("<div></div>").attr("class", "right-panel").append(
                                $("<img>").attr({
                                    "class": "poster-display",
                                    "src": "https://image.tmdb.org/t/p/w500/" + posterImg,
                                })
                            )
                        )
                    )
                );
                var genre=[];
                if(data1.genres.length!=null){
                     for(i=0;i<data1.genres.length;i++){   
                        genre.push(data1.genres[i].name);
                        var genres=genre.join(", ");
                    };
                }else{return null}
                $(".detail-container").append(
                    $("<p>Genres: "+genres+"</p>").attr("class","genre"),
                );
                var actor=[];
                if(data1.credits.cast.length!=null){
                     for(i=0;i<5;i++){   
                        actor.push(data1.credits.cast[i].name);
                        var actors=actor.join(", ");
                    };
                }else{return null}
                $(".detail-container").append(
                    $("<p>Actors: "+actors+"...</p>").attr("class","actors"),
                );
               

                // fetch(requestOmdbURL, {
                //     method: 'GET',
                // })
                // .then(function (response) {
                //     return response.json();
                // })
                // .then(function (data2) {
                //     // localStorage.setItem('OMDB-'+movieTitle,JSON.stringify(data2));
                //     var title1=JSON.parse(localStorage.getItem('themoviedb-'+data1.title));
                //     console.log(data2);
                //     // if(title1.matches(data2.Title)){
                //     //     $(".detail-container").prepend(
                //     //         $("<p>IMDB Score: "+data2.imdbRating+"</p>").attr("class","imdb-rating"),
                //     //         $("<p>Metascore: "+data2.Metascore+"</p>").attr("class","metascore"),
                //     //         $("<p>Rotten Tomatoes: "+data2.Ratings[1].Value+"</p>").attr("class","rotten-tomatoes"),
                //     //     ),
                //     //     $("<p>Rated: "+data2.Rated+"</p>").attr("class","rated").after($(".runtime")) 
                //     // }else{
                //     //     return null;
                //     // }
                // });
            });
        }else{return null}
        
    });

       
}