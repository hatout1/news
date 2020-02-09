const express = require("express");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const colors = require('colors')
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/hw18_wsDB";

mongoose.connect(
    MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);

// connection.on("error", console.error.bind(console, "connection error:"));
// connection.once("open", function () {
//     console.log("connected to db instance");
// });


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger("dev"))


const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);


app.get("/scrape", (req, res) => {
    axios.get("https://www.nytimes.com/section/technology").then(urlencoded => {
        const $ = cheerio.load(urlencoded.data);
        $("li.css-ye6x8s").each((i, element) => {
            const link = $(element)
                .find('a')
                .attr("href");
            const newsTitle = $(element)
                .find('h2.css-1j9dxys')
                .text();
            const newsBody = $(element)
                .find('p.css-1echdzn')
                .text()
            const newsImage = $(element)
                .find('img.css-11cwn6f')
                .attr('src')

        })
    })

})




app.listen(PORT, () => {
    console.log(`App listening: http://localhost:${PORT}`);
});