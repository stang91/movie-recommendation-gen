var pages = {
    'home' : `
        <div><img src="./assets/images/logo.png" alt="logoname" class="logo"></div>

        <div class="homePage col s12" id="home">
            <!------Control Panel-------->
            <div class="control-panel">
                <!-- search bar -->
                <div class="search-bar input-field col s12">
                    <input type="text" id="autocomplete-input" data-target="search-dropdown" class="autocomplete search-bar-input">
                    <label for="autocomplete-input">Type in your favorite movie to generate</label>
                </div>
            </div>
            <ul id="search-dropdown" class="drop-down hide">
                <li class="drop-down-item">
                    <p>title</p>
                    <p>Release Date</p>
                    <img src="https://image.tmdb.org/t/p/w500/pnK24nc7EuYEmozCeIGXfKZdMIi.jpg" img>
                </li>
            </ul>
            <!------Generated Movie Cards------>
            <div class="card-deck">
                <!-- these will be dynamically generated, tag class list card-container and card-image for respective parent/child elements -->
                <div class="card-container">
                    <img class="card-image" src="https://via.placeholder.com/686x1016">
                    <p class="card-text">movie title</p>
                </div>
                <div class="card-container">
                    <img class="card-image" src="https://via.placeholder.com/686x1016">
                    <p class="card-text">movie title</p>
                </div>
                <div class="card-container">
                    <img class="card-image" src="https://via.placeholder.com/686x1016">
                    <p class="card-text">movie title</p>
                </div>
                <div class="card-container">
                    <img class="card-image" src="https://via.placeholder.com/686x1016">
                    <p class="card-text">movie title</p>
                </div>
            </div>


            <!-- Recently Viewed -->
            <div class="recently-viewed">
                <div class="rv-header">
                    <h3>Recently Viewed</h3>
                </div class="rv-item-container">
                <div class="rv-item"><img src="https://via.placeholder.com/686x1016"></div>
                <div class="rv-item"><img src="https://via.placeholder.com/686x1016"></div>
                <div class="rv-item"><img src="https://via.placeholder.com/686x1016"></div>
                <div class="rv-item"><img src="https://via.placeholder.com/686x1016"></div>
                <div class="rv-item"><img src="https://via.placeholder.com/686x1016"></div>
                <div class="rv-item"><img src="https://via.placeholder.com/686x1016"></div>
            </div>
        </div> 
    `,
    'about' : `<h1>Our About Us</h1>`,
    'movie' : `
        <h1>Movie</h1>
        <div class="movieTitlePage col s12" id="movieTitle">
            <div class="title-page-container">
                <div class="left-panel">
                    <h1>title</h1>

                    <div class="imdb-rating">
                        <p>IMDB Score: 5/10</p>
                    </div>

                    <div class="release-date">
                        <p>2018</p>
                    </div>

                    <div class="description">
                        <div class="genre">
                            <p>Genre: Genre</p>
                        </div>

                        <div class="cast">
                            <p>Cast: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, rem.</p>
                        </div>

                        <div class="synopsis">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut aliquid totam laborum
                                veritatis
                                sapiente eum, ea sit. Numquam tenetur perferendis, molestias eius cum minima ut fugit
                                debitis
                                consequatur explicabo officiis?</p>
                        </div>
                    </div>

                </div>

                <div class="right-panel">
                    <img class="poster-display" src="https://via.placeholder.com/686x1016">
                </div>
            </div>
        </div>
    `,
};

function getPageContent(page){
    var contentToReturn;
    switch(page){
        case 'home':
            contentToReturn = pages.home;
            break;
        case 'about':
            contentToReturn = pages.about;
            break;
        case 'movie':
            contentToReturn = pages.movie;
            break;
        default:
            contentToReturn = pages.home;
            break;				
    }
    document.getElementById('content').innerHTML = contentToReturn; 
}