const express = require('express');
const os = require('os')
const cluster = require('cluster')

const noOfCpu = os.cpus().length;
console.log("noOfCpu", noOfCpu)

if (cluster.isPrimary) {
    console.log("process pid", process.pid)
    for (let i = 0; i < noOfCpu; i++) {
        cluster.fork()
        console.log('Parent node: ', process.pid, ' PID')
    }
} else {
    const app = express()
    app.get("/health", (req, res) => {
        console.log('Now this request serve by ', process.pid, ' PID')
        res.send("health check done")
    })

    app.listen(3000, () => {
        console.log("server is running at port", 3000, "and process pid: ", process.pid)
    })
}


