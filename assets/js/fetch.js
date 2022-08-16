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


// create drop down menu as user types 
var dropdownContentEl = document.querySelector(".dropdown-content")
var searchBarEl = document.querySelector(".search-bar-input")
searchBarEl.addEventListener("keydown", generateDropdown)

function generateDropdown () {
    var movieTitle = searchBarEl.value
    var requestThemoviedbURL='https://api.themoviedb.org/3/search/movie?api_key='+themoviedbAPIKey+'&query='+movieTitle;
    
    fetch(requestThemoviedbURL, {
        method: 'GET',
    })
    .then (function (response) {
        return response.json();
    })
    .then(function (data) {
        var searchDropdownEl = document.getElementById("search-dropdown")
        searchDropdownEl.innerHTML = '';
        searchDropdownEl.classList.remove("hide")

        if (searchBarEl.value !== "") {
        for (i=0; i<5; i++) {
            var dropDownItem = document.createElement("li");
            dropDownItem.classList.add("drop-down-item")
            dropDownItem.setAttribute("data-ID", data.results[i].id)

            var title = document.createElement("p");
            var poster = document.createElement("img");
            var releaseDate = document.createElement("p");
            title.textContent = data.results[i].original_title;
            if (data.results[i].poster_path) {
            poster.setAttribute("src", 'https://image.tmdb.org/t/p/w500'+data.results[i].poster_path)}
            releaseDate.textContent = data.results[i].release_date.substring(0,4);

            dropDownItem.append(title, releaseDate, poster)
            searchDropdownEl.append(dropDownItem)

            dropDownItem.addEventListener("click", function(event){
                var movieID = event.target.parentElement.getAttribute("data-ID");
                console.log(movieID)
                searchDropdownEl.classList.add("hide")

                //pass movieID to another fetch function to get the recommendation 
            })
        }
    }


    });

}


