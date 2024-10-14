import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TasksService } from './tasks/invoice.task';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), QueueModule],
  controllers: [InvoiceController],
  exports: [TypeOrmModule],
  providers: [InvoiceService, TasksService],
})
export class InvoiceModule {}
