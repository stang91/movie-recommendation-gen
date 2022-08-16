var themoviedbAPIKey='3f2452f7d97f59eff98805e2693a15a5';
var omdbAPIKey='935ff25c';
var NYTimesAPIKey='99pHA4SSLFBlbcbq9XE5ccI3Y2ys0q7h';

var movieTitle=$('.search-bar-input').toString().toLowerCase().split(' ').join('+');

var requestNYTimesURL='https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key='+NYTimesAPIKey+'&query='+movieTitle;
var requestThemoviedbURL='https://api.themoviedb.org/3/search/movie?api_key='+themoviedbAPIKey+'&query='+movieTitle;
var requestOmdbURL='https://omdbapi.com/?t='+movieTitle+'&apikey='+omdbAPIKey;
$('.generate-btn').click(function(){
    var movieTitle=$('.search-bar-input').val().toLowerCase().split(' ').join('+');
    var requestNYTimesURL='https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key='+NYTimesAPIKey+'&query='+movieTitle;
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
        displayTitlePage(data)
        console.log(data.Title)
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

    });
});


// Display Item Page 
var leftPanelEl = document.querySelector(".left-panel")
var rightPanelEl = document.querySelector(".right-panel")

function displayTitlePage (data) {
leftPanelEl.innerHTML = "";
rightPanelEl.innerHTML = "";

title = document.createElement("h1");
title.textContent = data.Title;
releaseDate = document.createElement("p");
releaseDate.textContent = "Released Year: " + data.Year;
genre = document.createElement("p");
genre.textContent = data.Genre;
cast = document.createElement("p");
cast.textContent= "Cast: " + data.Actors;
plot = document.createElement("p");
plot.textContent = data.Plot;

leftPanelEl.append(title, releaseDate, genre, cast, plot)

poster = document.createElement("div")
poster.innerHTML = "<img class='poster-display' src='" + data.Poster + "'>"

rightPanelEl.append(poster)

}