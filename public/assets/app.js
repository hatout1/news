$(document).ready(function () {

    console.log("Hello")

    $("#scrape").on("click", (e) => {
        console.log("clicked")

        $.ajax({
            method: "GET",
            url: "/scrape",
        }).done(data => {
            console.log(data)
            window.location = "/"
        })
    });
})