import { isMainThread, parentPort, workerData } from "worker_threads";

if (!isMainThread) {
    // Receive data from main thread
    const { number } = workerData

    // Perform heavy calculation
    let result = 0;
    for (let i = 0; i < number; i++) {
        result += i * 2
    }

    // Send the result to he main thread
    parentPort.postMessage({ result, workerId: workerData.id })
}