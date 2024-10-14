import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueProcessor } from './queue.processor';
import { QueueService } from './queue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'invoice-queue',
    }),
    TypeOrmModule.forFeature([Invoice]),
  ],
  providers: [QueueProcessor, QueueService],
  exports: [QueueService, BullModule],
})
export class QueueModule {}
