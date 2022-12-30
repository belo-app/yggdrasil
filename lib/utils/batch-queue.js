"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchQueue = void 0;
class BatchQueue {
    constructor(handler, size = 10) {
        this.handler = handler;
        this.size = size;
        this.queue = [];
        this.processing = false;
        this.process = () => {
            this.processing = true;
            try {
                this.handler([...this.queue]);
                this.queue = [];
            }
            finally {
                this.processing = false;
            }
        };
    }
    add(item) {
        this.queue.push(item);
        if (this.queue.length >= this.size && !this.processing) {
            this.process();
        }
    }
}
const batchQueue = (callback) => new BatchQueue(callback);
exports.batchQueue = batchQueue;
