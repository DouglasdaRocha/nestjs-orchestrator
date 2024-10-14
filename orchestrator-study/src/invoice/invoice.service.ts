import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) // Injetando o repositório
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    // Criar uma nova instância de Invoice com base no DTO
    const newInvoice = this.invoiceRepository.create(createInvoiceDto);

    // Salvar a nova fatura no banco de dados
    return await this.invoiceRepository.save(newInvoice);
  }
}
