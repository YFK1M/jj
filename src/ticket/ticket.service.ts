import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from 'src/schemas/ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { logger } from './ticket.module';
import { Model } from 'mongoose';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async getAll(): Promise<Ticket[] | void> {
    return this.ticketModel
      .find()
      .populate({
        path: 'match_id',
        populate: [{ path: 'first_command_id' }, { path: 'second_command_id' }],
      })
      .catch((err) => logger.error('Service.getAll', err));
  }

  async getById(id: string): Promise<Ticket | void> {
    return this.ticketModel
      .findById(id)
      .populate({
        path: 'match_id',
        populate: [{ path: 'first_command_id' }, { path: 'second_command_id' }],
      })
      .catch((err) => logger.error('Service.getById', err));
  }

  async create(ticketesDto: CreateTicketDto): Promise<Ticket | void> {
    const newTicket = new this.ticketModel(ticketesDto);
    return newTicket.save().catch((err) => logger.error('Service.create', err));
  }

  async remove(id: string): Promise<Ticket | void> {
    return this.ticketModel
      .findByIdAndRemove(id)
      .catch((err) => logger.error('Service.remove', err));
  }

  async update(id: string, ticketDto: UpdateTicketDto): Promise<Ticket | void> {
    return this.ticketModel
      .findByIdAndUpdate(id, ticketDto, { new: true })
      .catch((err) => logger.error('Service.update', err));
  }
}
