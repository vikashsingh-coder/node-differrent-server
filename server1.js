const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    if (req.url === "/read-file") {

        fs.readFile("large.txt", "utf8", (err, data) => { // asnyn 

            console.log("File Read Completed");

            res.end("File Read Done");

        });

    }

    else if (req.url === "/fast") {

        console.log("Fast Route Executed");

        res.end("Fast Route");

    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});