import { error } from 'console';
import { Worker } from 'worker_threads'

// create new worker thread
const worker = new Worker('./worker.js', {
    workerData: { number: 1000000000, id: 1 }
});

// Lister for the message from workers
worker.on("message", (msg) => {
    console.log(`result from worker ${msg.workerId}, message: ${msg.result}`)
})

// Handle error
worker.on('error', () => {
    console.log('worker error', error.message)
})

// Handle thread exit
worker.on('exit', (code) => {
    if (code !== 0) console.log(`worker stopped with exit code ${code}`);
    console.log('worker finished successfully')
})


// Now will create multiple worker thread instead of one, and distribute the heavy work among them

// import { Worker } from 'worker_threads'
















