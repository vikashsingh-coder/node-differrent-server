// import { isMainThread, parentPort, workerData } from "worker_threads";

// if (!isMainThread) {
//     // Receive data from main thread
//     const { number } = workerData

//     // Perform heavy calculation
//     let result = 0;
//     for (let i = 0; i < number; i++) {
//         result += i * 2
//     }

//     // Send the result to he main thread
//     parentPort.postMessage({ result, workerId: workerData.id })
// }

// How to configure new workers
import { isMainThread, parentPort, workerData, threadId } from 'worker_threads'

if (!isMainThread) {
    const { start, end, taskId } = workerData;
    console.log(`Thread ${threadId}, PID ${process.pid}, starting task ${taskId}`)

    let sum = 0;

    // sum all numbers in start and end range
    for (let i = start; i < end; i++) {
        sum += i;
    }

    console.log(`Thread ${threadId}, PID ${process.pid}, ending task ${taskId}`)

    parentPort.postMessage({ taskId, sum, threadId })

}