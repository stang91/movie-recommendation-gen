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
                $("<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum temporibus nemo necessitatibus rerum itaque distinctio ea molestiae amet deserunt tempore corporis, magni debitis possimus? Necessitatibus eius ullam saepe officiis laboriosam!</p>").attr("class","about-content")
            )
        )
    );
    
}

