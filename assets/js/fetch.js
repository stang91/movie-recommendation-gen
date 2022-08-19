var themoviedbAPIKey='3f2452f7d97f59eff98805e2693a15a5';
var omdbAPIKey='935ff25c';
var nyTimesAPIKey='99pHA4SSLFBlbcbq9XE5ccI3Y2ys0q7h';

var movieTitle=$('.search-bar-input').toString().toLowerCase().split(' ').join('+');

var requestNYTimesURL='https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key='+nyTimesAPIKey+'&query='+movieTitle;
var requestThemoviedbURL='https://api.themoviedb.org/3/search/movie?api_key='+themoviedbAPIKey+'&query='+movieTitle;
var requestOmdbURL='https://omdbapi.com/?t='+movieTitle+'&apikey='+omdbAPIKey;


$('.generate-btn').click(function(){
    var movieTitle=$('.search-bar-input').val().toLowerCase().split(' ').join('+');
    var requestNYTimesURL='https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key='+nyTimesAPIKey+'&query='+movieTitle;
    var requestThemoviedbURL='https://api.themoviedb.org/3/search/movie?api_key='+themoviedbAPIKey+'&query='+movieTitle;
    var requestOmdbURL='https://omdbapi.com/?t='+movieTitle+'&apikey='+omdbAPIKey;

    fetch(requestNYTimesURL, {
        method: 'GET',
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // localStorage.setItem('NYTimes-'+movieTitle,JSON.stringify(data));
        console.log(data);
    });
    
    fetch(requestOmdbURL, {
        method: 'GET',
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // localStorage.setItem('OMDB-'+movieTitle,JSON.stringify(data));
        console.log(data);
    });
    
    fetch(requestThemoviedbURL, {
        method: 'GET',
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // localStorage.setItem('themoviedb-'+movieTitle,JSON.stringify(data));
        console.log(data);
        // 'https://image.tmdb.org/t/p/w500/'+posterImg;
        // 'https://api.themoviedb.org/3/genre/movie/list?api_key='+themoviedbAPIKey;
        for (var i=0;i<data.results.length;i++){
            
            var moiveID=data.results[i].id;
            var requestThemoviedbURL2="https://api.themoviedb.org/3/movie/"+moiveID+"?api_key="+themoviedbAPIKey+"&append_to_response=videos,images,credits,reviews";

            fetch(requestThemoviedbURL2, {
                method: 'GET',
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // localStorage.setItem('themoviedb-'+movieTitle,JSON.stringify(data));
                console.log(data);
                // 'https://image.tmdb.org/t/p/w500/'+posterImg;
                // 'https://api.themoviedb.org/3/genre/movie/list?api_key='+themoviedbAPIKey;
            
            });
        };
    });
    
});
