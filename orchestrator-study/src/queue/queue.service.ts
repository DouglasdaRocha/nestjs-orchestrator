import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('invoice-queue') private queue: Queue) {}

  async addJob(data: any) {
    await this.queue.add('job', data);
  }

  async addBulkJobs(data: any[]) {
    const jobs = data.map((d) => ({
      name: 'job',
      data: d,
    }));

    await this.queue.addBulk(jobs);
  }
}
