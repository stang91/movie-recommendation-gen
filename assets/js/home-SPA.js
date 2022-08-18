function getHome(){
    $(document).prop("title","Home | Flick Genie");
    $("#content").empty();
    $("#content").append(
        //logo image
        $("<div></div>").append(
            $("<img>").attr({
                "src":"./assets/images/logo.png",
                 "alt":"logoname",
                 "class":"logo"})
        ),
        //search bar
        $("<div></div>").attr({
            "class":"homePage col s12",
            "id":"home"
        }).append(
            $("<div></div>").attr("class","control-panel").append(
                $("<div></div>").attr("class","search-bar input-field col s12").append(
                    //input
                    $("<input>").attr({
                        "type":"text",
                        "id":"autocomplete-input noActive",
                        "data-target":"search-dropdown",
                        "class":"autocomplete search-bar-input"
                    }),
                    $("<label class='black-text'>Type in your favorite movie to generate</label>").attr("for","autocomplete-input"),
                    ))),
        //generate btn
        $("<div></div").attr({
            "class":"generate-btn-container",
            "onclick":"generateMovie()"
        }).append($("<a>generate</a>").attr("class","btn waves-effect waves-teal generate-btn")),
        //dropdown
        $("<ul></ul>").attr({
            "id":"search-dropdown",
            "class":"drop-down hide"
        }).append($("<li></li>").attr("class","drop-down-item")),
        //recent viewed
        $("<div></div>").attr("class","recently-viewed").append(
            $("<h3>Recently Viewed</h3>"),
            $("<div></div>").attr("class","rv-item-container").append(
                $("<img>").attr({
                    "class":"rv-item",
                    "src":"https://via.placeholder.com/686x1016"
                })
    )));
    var searchBarEl = document.querySelector(".search-bar-input");
    searchBarEl.addEventListener("keydown", generateDropdown);

    function generateDropdown () {
        var movieTitle = searchBarEl.value; //problem here
        var requestThemoviedbURL='https://api.themoviedb.org/3/search/movie?api_key='+themoviedbAPIKey+'&query='+movieTitle;
        
        fetch(requestThemoviedbURL, {
            method: 'GET',
        })
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var searchDropdownEl = document.getElementById("search-dropdown");
            searchDropdownEl.innerHTML = '';
            searchDropdownEl.classList.remove("hide");
            for(i=0;i<data.results.length;i++){
                $('input.autocomplete').autocomplete({
                    data: data.results[i].original_title,  //problem here
                    limit: 5,
                    minLength: 4
                  });
            }
            if (searchBarEl.value !== "") {
                for (i=0; i<5; i++) {
                    var dropDownItem = document.createElement("li");
                    dropDownItem.classList.add("drop-down-item");
                    dropDownItem.setAttribute("data-ID", data.results[i].id);
                    var title = document.createElement("p");
                    var poster = document.createElement("img");
                    var releaseDate = document.createElement("p");
                    title.textContent = data.results[i].original_title;
                    if (data.results[i].poster_path) {
                        poster.setAttribute("src", 'https://image.tmdb.org/t/p/w500'+data.results[i].poster_path);
                    }
                    releaseDate.textContent = data.results[i].release_date.substring(0,4);
                
                    dropDownItem.append(title, releaseDate, poster);
                    searchDropdownEl.append(dropDownItem);
                
                    dropDownItem.addEventListener("click", function(event){
                        var movieID = event.target.parentElement.getAttribute("data-ID");
                        console.log(movieID);
                        searchDropdownEl.classList.add("hide");
                        //pass movieID to another fetch function to get the recommendation 
                    });
                };
            };
        });
    }
}

