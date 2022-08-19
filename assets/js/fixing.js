
//video
$("<div></div>").attr({
    "class":data1.title+" trailer",
    "id":data1.title+" trailer"
}).append(
    $("<iframe></iframe>").attr({
        "width":"560",
        "height":"315",
        "src":"https://www.youtube.com/embed/"+video,
        "title":"YouTube video player",
        "frameborder":"0",
        "allow":"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    }),
)

