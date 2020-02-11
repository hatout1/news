$(document).ready(function () {

    $("#scrape").on("click", (e) => {
        console.log("clicked")
        e.preventDefault();
        $.ajax({
            method: "GET",
            url: "api/scrape",
        }).then(data => {
            console.log(data)
            window.location = "/"
        })
    });

    showArticles()
})

const showArticles = () => {
    $.ajax({
        methode: "GET",
        url: "api/articles"
    }).then(articles => {

        articles.map(res => {

            console.log(res._id)
            $(".ArticlesSpace").append(
                `<div data-_id="${res._id}" class="card">
                <div class="card-header">
                    <h3>
                        <a class="article-link" target="_blank" rel="noopener noreferrer"
                            href="${res.link}">${res.title}</a>
                        <a class="btn btn-success save">Save Article</a>
                    </h3>
                </div>
                <div class="card-body">${res.summary}</div>
            </div>`)
        })

    })

}

