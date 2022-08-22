var movieID;
var randomBank = [];
var searchBarText;

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
            $("<div></div>").attr({
                "class": "control-panel"
            }).append(
                $("<div></div>").attr({
                    "class": "search-bar input-field col s12"
                }).append(
                    //input
                    $("<input>").attr({
                        "type": "text",
                        "id": "autocomplete-input",
                        "data-target": "search-dropdown",
                        "class": "autocomplete search-bar-input"
                    }),

                    $("<label>Type in your favorite movie to generate</label>").attr({
                        "class": "autocomplete-prompt",
                        "for": "autocomplete-input"
                    }),
                )
            )
        ),
        //generate btn
        $("<div></div").attr({
            "class": "generate-btn-container",
            "data-id": "generate-btn-container",
        }).append($("<a>generate</a>").attr({
            "class": "btn waves-effect waves-teal generate-btn",
            "onclick": "getRec(movieID, event)"
        })),

        //dropdown
        $("<ul></ul>").attr({
            "id": "search-dropdown",
            "class": "drop-down hide"
        }).append($("<li></li>").attr({
            "class": "drop-down-item"
        })),

        //recommended posters
        $("<div></div>").attr({
            "class": "card-deck"
        }),

    );
    //recent view
    $("#content").append(
        $("<div></div>").attr({
            "class": "recently-viewed",
        }).append(
            $("<h3>Recently Viewed</h3>"),
            $("<div></div>").attr("class", "rv-item-container")
        )
    );
    //creating recent views
    for (var i = 0; i < localStorage.length; i++) {
        var recentView = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (recentView.poster_path !== null) {
        $(".rv-item-container").append(
            $("<a></a>").attr({
                "href": "#"+ recentView.title.replaceAll(" ", "-"),
                "class": "rv-item",
                "data-ID": recentView.id,
                "data-title": recentView.title
            }).append(
                $("<img>").attr({
                    "class": "rv-item",
                    "id": recentView.id,
                    "data-ID": recentView.id,
                    "data-title": recentView.title,
                    "src": "https://image.tmdb.org/t/p/w500/" + recentView.poster_path,
                }))
        );
    }};
    $(".rv-item").click(generateMovie);


    var searchBarEl = document.querySelector(".search-bar-input");
    var searchDropdownEl = document.getElementById("search-dropdown");

    searchBarEl.addEventListener("keyup", generateDropdown);


    function generateDropdown() {
        var movieTitle = searchBarEl.value;
        var requestThemoviedbURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + themoviedbAPIKey + '&query=' + movieTitle;
        $(".autocomplete-prompt").removeClass("hide");
        fetch(requestThemoviedbURL, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                searchDropdownEl.innerHTML = '';
                searchDropdownEl.classList.remove("hide");
                if (searchBarEl.value) {
                    for (i = 0; i < 5; i++) {
                        var dropDownItem = document.createElement("li");
                        dropDownItem.classList.add("drop-down-item");
                        dropDownItem.setAttribute("data-ID", data.results[i].id);
                        dropDownItem.setAttribute("data-title", data.results[i].original_title);

                        var title = document.createElement("p");
                        title.textContent = data.results[i].original_title;


                        var releaseDate = document.createElement("p");
                        if (data.results[i].release_date) {
                        releaseDate.textContent = data.results[i].release_date.substring(0, 4);}

                        var poster = document.createElement("img");
                        if (data.results[i].poster_path) {
                            poster.setAttribute("src", 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path);
                        }

                        dropDownItem.append(title, releaseDate, poster);
                        searchDropdownEl.append(dropDownItem);

                        title.addEventListener("click", getMovieID);
                        releaseDate.addEventListener("click", getMovieID);
                        poster.addEventListener("click", getMovieID);
                    };
                }
            });
    }

    function getMovieID(event) {
        movieID = event.target.parentElement.getAttribute("data-ID");
        searchDropdownEl.classList.add("hide");
        searchBarText = event.target.parentElement.getAttribute("data-title");
        searchBarEl.value = searchBarText;
        getRec(movieID, event);
        return movieID, event, searchBarText;
    }


    //basically load the poster cards using stored movie_ID and randomIndex when home button is clicked.
    if(movieID){
        getRec(movieID, event);
        searchBarEl.value = searchBarText;
        $(".autocomplete-prompt").attr("class","hide");
    };

}



function getRec(movieID, event) {

    var cardDeckEl = document.querySelector(".card-deck");
    cardDeckEl.innerHTML = '';

    var movieDBRecURL = "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=" + themoviedbAPIKey;
    fetch(movieDBRecURL, {
        method: 'GET',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //when generating recommendation, if home button was clicked, we keep the same random Index effectively loading the same posters generated before
            if (event) {
                if (event.target.classList.contains("home-btn")) { generateCards(data) }
                else {
                    getRandomIndex(data);
                    generateCards(data);
                }
            }

            function generateCards(data) {
                for (i = 0; i < 4; i++) {
                    var posterDisplay = document.createElement("div");
                    posterDisplay.classList.add("card-container");
                    var urlTitle = data.results[randomBank[i]].title.replaceAll(" ", "-");
                    posterDisplay.innerHTML = "<a href='#" + urlTitle + "'> <img class='card-image' data-title='" + data.results[randomBank[i]].title + "' src=https://image.tmdb.org/t/p/w500" + data.results[randomBank[i]].poster_path + "></a> <p class='card-text'>" + data.results[randomBank[i]].title + "<p>";
                    posterDisplay.setAttribute("data-ID", data.results[randomBank[i]].id);
                    posterDisplay.setAttribute("data-title", data.results[randomBank[i]].title);
                    cardDeckEl.append(posterDisplay);

                    posterDisplay.addEventListener("click", generateMovie);

                };
            }
            return randomBank;
        });
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
