import { Worker } from 'worker_threads'

// create new worker
const worker = new Worker('./worker.js', {
    workerData: { number: 10000000, id: 1 }
});

