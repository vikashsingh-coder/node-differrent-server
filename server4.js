const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/slow") {

        console.log("Slow route started");

        // Heavy CPU Task
        for (let i = 0; i < 1000000000000000; i++) {
            console.log("Slow route finished");
            res.end("Slow Route Completed");
        }
    }

    else if (req.url === "/fast") {
        console.log("Fast route executed");
        res.end("Fast Route Completed");
    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});