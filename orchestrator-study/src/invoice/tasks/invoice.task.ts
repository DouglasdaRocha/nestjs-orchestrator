import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly queueService: QueueService,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    // Busca as invoices com status 'Processing'
    const invoices = await this.invoiceRepository.find({
      where: { status: 'Processing' },
    });

    // Adiciona todos os invoices na fila
    await this.queueService.addBulkJobs(invoices);

    // Para cada invoice, adiciona uma tarefa separada na fila
    // for (const invoice of invoices) {
    //   this.logger.debug(`Criando fila invoice: ${invoice.id}`);
    //   await this.queueService.addJob({
    //     invoiceId: invoice.id,
    //     message: `Processing invoice ${invoice.id}`,
    //   });
    // }
  }
}
