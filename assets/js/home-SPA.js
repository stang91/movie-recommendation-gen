function getHome(event) {
    $(document).prop("title", "Home | Flick Genie");
    $("#content").empty();
    $("#content").append(
        //logo image
        $("<div></div>").append(
            $("<img>").attr({
                "src": "./assets/images/logo.png",
                "alt": "logoname",
                "class": "logo"
            })
        ),
        //search bar
        $("<div></div>").attr({
            "class": "homePage col s12",
            "id": "home"
        }).append(
            $("<div></div>").attr("class", "control-panel").append(
                $("<div></div>").attr("class", "search-bar input-field col s12").append(
                    //input
                    $("<input>").attr({
                        "type": "text",
                        "id": "autocomplete-input",
                        "data-target": "search-dropdown",
                        "class": "autocomplete search-bar-input"
                    }),
                    $("<label>Type in your favorite movie to generate</label>").attr("for", "autocomplete-input"),
                ))),
        //generate btn
        $("<div></div").attr({
            "class": "generate-btn-container",
            "data-id": "generate-btn-container",
            "onclick": "getRec(movieID, event)"
        }).append($("<a>generate</a>").attr("class", "btn waves-effect waves-teal generate-btn")),
        //dropdown
        $("<ul></ul>").attr({
            "id": "search-dropdown",
            "class": "drop-down hide"
        }).append($("<li></li>").attr("class", "drop-down-item")),

        //recommended posters
        $("<div></div>").attr({
            "class": "card-deck"
        }),

        //recent viewed
        $("<div></div>").attr("class", "recently-viewed").append(
            $("<h3>Recently Viewed</h3>"),
            $("<div></div>").attr("class", "rv-item-container").append(
                $("<img>").attr({
                    "class": "rv-item",
                    "src": "https://via.placeholder.com/686x1016"
                })
            )));

    var searchBarEl = document.querySelector(".search-bar-input");
    searchBarEl.addEventListener("keydown", generateDropdown);

    var searchDropdownEl = document.getElementById("search-dropdown");

    function generateDropdown() {
        var movieTitle = searchBarEl.value;
        var requestThemoviedbURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + themoviedbAPIKey + '&query=' + movieTitle;

        fetch(requestThemoviedbURL, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                // console.log(data);
                searchDropdownEl.innerHTML = '';
                searchDropdownEl.classList.remove("hide");

                for (i = 0; i < data.results.length; i++) {
                    $('input.autocomplete').autocomplete({
                        data: data.results[i].original_title,
                        limit: 5,
                        minLength: 4
                    });
                }

                if (searchBarEl.value) {

                    for (i = 0; i < 5; i++) {
                        var dropDownItem = document.createElement("li");
                        dropDownItem.classList.add("drop-down-item");
                        dropDownItem.setAttribute("data-ID", data.results[i].id);
                        var title = document.createElement("p");
                        var poster = document.createElement("img");
                        var releaseDate = document.createElement("p");
                        title.textContent = data.results[i].original_title;

                        if (data.results[i].poster_path) {
                            poster.setAttribute("src", 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path);
                        }

                        releaseDate.textContent = data.results[i].release_date.substring(0, 4);

                        dropDownItem.append(title, releaseDate, poster);
                        searchDropdownEl.append(dropDownItem);

                        title.addEventListener("click", getMovieID)
                        releaseDate.addEventListener("click", getMovieID)
                        poster.addEventListener("click", getMovieID)


                    }
                }
            })
    }



    function getMovieID(event) {
        movieID = event.target.parentElement.getAttribute("data-ID");
        console.log(movieID);
        searchDropdownEl.classList.add("hide");
        getRec(movieID, event);
        return movieID, event;
    }

    getRec(movieID, event)

}
var movieID
var randomBank = [];


function getRec(movieID, event) {

    // console.log(event.target.classList.contains("home-btn"))    
    var cardDeckEl = document.querySelector(".card-deck")
    cardDeckEl.innerHTML = '';

    var movieDBRecURL = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=" + themoviedbAPIKey
    fetch(movieDBRecURL, {
        method: 'GET',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if (event.target.classList.contains("home-btn")) { generateCards(data) } else {
                getRandomIndex(data)
                generateCards(data)
            };

            function generateCards(data) { }
            for (i = 0; i < 4; i++) {
                randomBank.push(randomBank[i]);
                var posterDisplay = document.createElement("div");
                posterDisplay.classList.add("card-container");
                posterDisplay.innerHTML = "<img class='card-image' data-title='" + data.results[randomBank[i]].title + "' src=https://image.tmdb.org/t/p/w500" + data.results[randomBank[i]].poster_path + "> <p class='card-text'>" + data.results[randomBank[i]].title + "<p>"
                posterDisplay.setAttribute("data-ID", data.results[randomBank[i]].id)
                posterDisplay.setAttribute("data-title", data.results[randomBank[i]].title)
                cardDeckEl.append(posterDisplay);

                posterDisplay.addEventListener("click", generateMovie);

            }


            return randomBank
        })


}

function getRandomIndex(data) {
    randomBank = [];
    for (i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * data.results.length);
        if (randomBank.includes(randomIndex)) {
            i--;
        } else {
            randomBank.push(randomIndex);
        }
    }

    return randomBank;
}