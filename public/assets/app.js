$(document).ready(function () {

    $("#scrape").on("click", (e) => {
        console.log("clicked")
        e.preventDefault();
        $.ajax({
            method: "GET",
            url: "articles/scrape",
        }).then(data => {
            console.log(data)
            window.location = "/"
        })
    });


    $("#clearAllArticles").on("click", (e) => {
        e.preventDefault();
        $.ajax({
            method: "DELETE",
            url: "articles/delete"
        }).then(res => {
            res.send("All articles are delteted now")
        })
        window.location = "/"
    });

    $("#clearSavedArticles").on("click", (e) => {
        e.preventDefault();
        $.ajax({
            method: "DELETE",
            url: "articles/deleteAllSavedArticles"
        }).then(res => {
            res.send("All articles are delteted now")
        })
        window.location = "/notes"
    });


    $(document).on("click", '#toSaveArticle', (e) => {
        e.preventDefault();
        console.log("id")

        const id = $(e.target).attr("data-id")
        console.log(id)
        $.ajax({
            method: "POST",
            url: "/articles/toSave/" + id
        }).done(data => {
            console.log(data)
        })
        window.location = "/"
    })

    $(document).on("click", "#deleteFromSaved", (e) => {
        e.preventDefault();

        const id = $(e.target).attr("data-id")
        console.log(id)
        $.ajax({
            method: "POST",
            url: "/articles/deleteSave/" + id
        }).done(data => {
            console.log(data)
        })
        window.location = "/notes"
    })



    showArticles()
    showSavedArticles()
})

const showArticles = () => {

    $.ajax({
        methode: "GET",
        url: "articles/articles"
    }).then(articles => {

        articles.map(res => {
            if (res.picture) {
                $(".ArticlesSpace").append(
                    `<div style="display:flex; margin: 10px; text-align:center">
                        <div class="pictureArea" style="flex:1">
                            <img src="${res.picture}" alt="" srcset="" style="width:300px; hight:100%">
                        </div>
                            <div  class="card" style="flex:4">
                                <div class="card-header">
                                    <h3>
                                    <a class="article-link" target="_blank" rel="noopener noreferrer"
                                        href="${res.link}">${res.title}</a>
                                    <a data-id="${res._id}" class="btn btn-success save" id="toSaveArticle">Save Article</a>
                                    </h3>
                                </div>
                                <div class="card-body">${res.summary}
                                </div>
                            </div> 
                    </div>`)
            } else {
                $(".ArticlesSpace").append(
                    `<div style="display:flex; margin: 10px; text-align:center">
                        <div class="pictureArea" style="flex:1;">
                            <img src="https://images.squarespace-cdn.com/content/v1/59f083016957da917f5a19f6/1563473315931-JEOO5C2DJX6DYE6SI0OF/ke17ZwdGBToddI8pDm48kFTEgwhRQcX9r3XtU0e50sUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcW7uEhC96WQdj-SwE5EpM0lAopPba9ZX3O0oeNTVSRxdHAmtcci_6bmVLoSDQq_pb/news-tsodotcom.jpg?format=250w" alt="" srcset="">
                        </div>
                         <div data-id="${res._id}" class="card" style="flex:4">
                                <div class="card-header">
                                    <h3>
                                    <a class="article-link" target="_blank" rel="noopener noreferrer"
                                        href="${res.link}">${res.title}</a>
                                    <a class="btn btn-success save">Save Article</a>
                                    </h3>
                                </div>
                                <div class="card-body">${res.summary}
                                </div>
                            </div>
                         </div>`)
            }
        })
    })
}

const showSavedArticles = () => {
    $.ajax({
        methode: "GET",
        url: "articles/savedArticles"
    }).then(saved => {
        saved.map(res => {
            if (res.picture) {
                $("#savedArticlesArea").append(
                    `<div style="display:flex; margin: 10px; text-align:center">
                            <div class="pictureArea" style="flex:1">
                                <img src="${res.picture}" alt="" srcset="" style="width:300px; hight:100%">
                            </div>
                                <div  class="card" style="flex:4">
                                    <div class="card-header">
                                    <h3>
                                    <a class="article-link" target="_blank" rel="noopener noreferrer" href="${res.link}">${res.title}</a>
                                    <a class="btn btn-danger delete" data-id="${res._id}" id="deleteFromSaved">Delete From Saved</a>
                                    <a class="btn btn-info notes">Article Notes</a>
                                </h3>
                                    </div>
                                    <div class="card-body">${res.summary}
                                    </div>
                                </div>
                        </div>`)
            } else {
                $("#savedArticlesArea").append(
                    `<div data-_id="${res._id}" class="card">
                        <div class="card-header">
                            <h3>
                                <a class="article-link" target="_blank" rel="noopener noreferrer" href="${res.link}">${res.title}</a>
                                <a class="btn btn-danger delete" data-id="${res._id}" id="deleteFromSaved">Delete From Saved</a>
                                <a class="btn btn-info notes">Article Notes</a>
                            </h3>
                        </div>
                        <div class="card-body">${res.summary}</div>
                    </div>`)
            }
        })
    })
}
