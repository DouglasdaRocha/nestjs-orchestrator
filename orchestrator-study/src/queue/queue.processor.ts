import { OnWorkerEvent, Processor } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { WorkerHost } from '@nestjs/bullmq';

@Processor('invoice-queue', { concurrency: 100 }) // Nome da fila
export class QueueProcessor extends WorkerHost {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {
    super();
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job<any>) {
    console.log(`Job ${job.id} failed with reason: ${job.failedReason}`);
  }

  // Processa cada job individualmente
  async process(job: Job<any>) {
    const data = job.data;

    // Busca a invoice pelo ID
    const invoice = await this.invoiceRepository.findOne({
      where: { id: data.id },
    });

    if (invoice) {
      // Processa o invoice e altera o status para 'Paid'
      invoice.status = 'Paid';
      await this.invoiceRepository.save(invoice);
      job.updateProgress(100); // Marca o job como completado

      console.log(`Invoice ${data.id} status updated to Paid`);
    }
  }
}
