type BatchHandler<T = any> = (items: T[]) => void;

class BatchQueue<T> {
  private queue: T[] = [];
  private processing = false;

  constructor(private handler: BatchHandler<T>, private size: number = 10) {}

  public add(item: T) {
    this.queue.push(item);

    if (this.queue.length >= this.size && !this.processing) {
      this.process();
    }
  }

  private process = () => {
    this.processing = true;

    try {
      this.handler([...this.queue]);
      this.queue = [];
    } finally {
      this.processing = false;
    }
  };
}

export const batchQueue = <T>(callback: BatchHandler<T>) =>
  new BatchQueue<T>(callback);
