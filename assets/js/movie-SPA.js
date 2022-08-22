function generateMovie (event){
    //if we want to rework this section using movie_ID from theMOVIEDB, it can be found on the data-title attribute on the poster container $(".card-container")
    var movieTitle = event.target.getAttribute("data-title");
    var requestThemoviedbURL='https://api.themoviedb.org/3/search/movie?api_key='+themoviedbAPIKey+'&query='+movieTitle;
    var requestOmdbURL='https://omdbapi.com/?t='+movieTitle+'&apikey='+omdbAPIKey;
    
    //featch 
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
                localStorage.setItem('themoviedb-'+movieTitle,JSON.stringify(data1));
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
                    $("<p>Genres: "+genres+"</p>").attr("class","genre")
                );
                var actor=[];
                if(data1.credits.cast.length!=null){
                     for(i=0;i<5;i++){   
                        actor.push(data1.credits.cast[i].name);
                        var actors=actor.join(", ");
                    };
                }else{return null}
                $(".detail-container").append(
                    $("<p>Actors: "+actors+"...</p>").attr("class","actors")
                );
                if (data1.videos.results.length!=null){
                    var video=data1.videos.results[0].key;
                }else{return null}
                $("#content").prepend(
                //video
                    $("<div></div>").attr({
                        "class":data1.title+" trailer",
                        "id":data1.title+" trailer"
                    }).append(
                        $("<div></div>").attr("class","video-container").append(
                            $("<iframe></iframe>").attr({
                                "width":"560",
                                "height":"315",
                                "src":"https://www.youtube.com/embed/"+video,
                                "title":"YouTube video player",
                                "frameborder":"0",
                                "allow":"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            }), 
                        )
                    )
                );
                if (data1.reviews.results.length!=null){
                    for(i=0;i<data1.reviews.results.length;i++){
                        var author=data1.reviews.results[i].author;
                        var rating=data1.reviews.results[i].author_details.rating;
                        var content=data1.reviews.results[i].content;
                        var website=data1.reviews.results[i].url;
                        $("#content").append(
                            $("<div></div>").attr("class","reviews-container").append(
                                $("<div></div>").attr("class","review-authorAndRating").append(
                                    $("<p>"+author+"</p>"),
                                    $("<p>"+rating+"</p>")
                                ),
                                $("<div></div>").attr("class","review-contentAndUrl").append(
                                    $("<p>"+content+"</p>"),
                                    $("<a>themoviedb</a>").attr("href",website)
                                )
                            )
                        );
                    }
                }else{return null}
                
                fetch(requestOmdbURL, {
                    method: 'GET',
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data2) {
                    var title1=JSON.parse(localStorage.getItem('themoviedb-'+data2.Title)).title;
                    if(title1===data2.Title){
                        $(".detail-container").prepend(
                            $("<p>IMDB Score: "+data2.imdbRating+"</p>").attr("class","imdb-rating"),
                            $("<p>Metascore: "+data2.Metascore+"</p>").attr("class","metascore"),
                            $("<p>Rotten Tomatoes: "+data2.Ratings[1].Value+"</p>").attr("class","rotten-tomatoes"),
                            $("<p>Rated: "+data2.Rated+"</p>").attr("class","rated")
                        );
                    }else{
                        return null;
                    }
                    var requestNYTimesURL='https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key='+nyTimesAPIKey+'&query='+movieTitle;

                    fetch(requestNYTimesURL, {
                        method: 'GET',
                    })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data3) {
                        if(data3.results.length!=null){
                            for(i=0;i<data3.results.length;i++){
                                var title1=JSON.parse(localStorage.getItem('themoviedb-'+data3.results[i].display_title)).original_title;
                                if(title1===data3.results[i].display_title){
                                    $("#content").append(
                                        $("<div></div>").attr("class","reviews-container").append(
                                            $("<div></div>").attr("class","review-authorAndRating").append(
                                                $("<p>"+data3.results[i].byline+"</p>"),
                                            ),
                                            $("<div></div>").attr("class","review-contentAndUrl").append(
                                                $("<p>"+data3.results[i].headline+"</p>"),
                                                $("<p>"+data3.results[i].summary_short+"</p>"),
                                                $("<a>"+data3.results[i].link.suggested_link_text+"</a>").attr("href",data3.results[i].link.url)
                                            )
                                        )
                                    );
                                }else{
                                    return null;
                                }
                            };
                        }else{return null}
                    });
                    
                });
            });
        }else{return null}
        
    });

       
}