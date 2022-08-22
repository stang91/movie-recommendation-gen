function getAbout(){
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
        //aobut us  title and paragraph
        $("<div></div>").attr("class","about-container").append(
            $("<h1>About Us</h1>"),
            $("<div></div>").attr("class","about-content-container").append(
                $("<p>We are avid movies fan, but sometimes we just can’t seem to think of a good movie to watch.  So we, at Flick Genie, created a movie recommendation generator.  All you need to do is add a movie title and click the movie title in the dropdown and it will generate 4 movies recommendation.  If you don’t like the movies recommended just click the generate button once more, to get new recommendation.</p>").attr("class","about-content")
            )
        )
    );
    
}

