const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    if (req.url === "/read-file") {
        console.log("Starting Sync Read...");

        let data;
        for (let i = 0; i < 100; i++) {
            data = fs.readFileSync("100mb-examplefile-com.txt", "utf8");
        }

        // This runs ONLY AFTER the file is read
        console.log("File Read Completed");
        res.end("File Read Done");
    }

    else if (req.url === "/fast") {
        // This will NOT run while /read-file is blocking
        console.log("Fast Route Executed");
        res.end("Fast Route");
    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});