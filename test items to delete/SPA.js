var pages = {
    'about' : `
        <h1>Our About Us</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum temporibus nemo necessitatibus rerum itaque distinctio ea molestiae amet deserunt tempore corporis, magni debitis possimus? Necessitatibus eius ullam saepe officiis laboriosam!</p>
    `,
    'movie' : `
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