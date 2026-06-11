// import { error } from 'console';
// import { Worker } from 'worker_threads'

// // create new worker thread
// const worker = new Worker('./worker.js', {
//     workerData: { number: 1000000000, id: 1 }
// });

// // Lister for the message from workers
// worker.on("message", (msg) => {
//     console.log(`result from worker ${msg.workerId}, message: ${msg.result}`)
// })

// // Handle error
// worker.on('error', () => {
//     console.log('worker error', error.message)
// })

// // Handle thread exit
// worker.on('exit', (code) => {
//     if (code !== 0) console.log(`worker stopped with exit code ${code}`);
//     console.log('worker finished successfully')
// })


// Now will create multiple worker thread instead of one, and distribute the heavy work among 3 worker equally

import { Worker, threadId } from 'worker_threads'

const TOTAL_NUM = 300000000;
const NUM_WORKERS = 3;
const CHUNK_SIZE = Math.ceil(TOTAL_NUM / NUM_WORKERS) // How many data handle by each worker

console.log('Main Thread ID:', threadId)
console.log('Main Process PID', process.pid)
console.log('No of workers', NUM_WORKERS)

let completed = 0;
let totalsum = 0;

// create 3 worker in our case
for (let i = 0; i < NUM_WORKERS; i++) {

    // creating state and end ranage
    // first: 0 * 100000000 = 0
    // second: 1 * 100000000 = 100000000
    // third: 2 * 100000000 = 200000000
    const start = i * CHUNK_SIZE;

    // first: min of 100000000, 300000000    
    // second: min of 100000000 + 100000000 = (20000000, 300000000)
    // third: min of 200000000 + 100000000 = (300000000, 300000000)
    const end = Math.min(start + CHUNK_SIZE, TOTAL_NUM)

    const worker = new Worker('./worker.js', {
        workerData: { start, end, taskId: i + 1 }  // 0, 100000000
    })

    // Capture result from worker
    worker.on('message', (msg) => {
        totalsum += msg.sum
        completed++  // increase every time a worker give result

        if (completed == NUM_WORKERS) { // all workers give result
            console.log(`all workers done. final sum ${totalsum}`)
            console.log(`Note: all thread share same process id ${process.pid}`)
        }
    })

    // capture error
    worker.on('error', (error) => {
        console.log('error: ', error.message)
    })
}


// let's run our main.js file








