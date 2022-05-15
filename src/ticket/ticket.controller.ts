import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Ticket } from 'src/schemas/ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  getAll(): Promise<Ticket[] | void> {
    return this.ticketService.getAll();
  }

  @Get(':id')
  getTicket(@Param('id') id: string): Promise<Ticket | void> {
    return this.ticketService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createTicket(@Body() createTicketDto: CreateTicketDto): Promise<Ticket | void> {
    return this.ticketService.create(createTicketDto);
  }

  @Delete(':id')
  removeTicket(@Param('id') id: string): Promise<Ticket | void> {
    return this.ticketService.remove(id);
  }

  @Put(':id')
  updateTicket(@Body() updateTicketDto: UpdateTicketDto, @Param('id') id: string): Promise<Ticket | void> {
    return this.ticketService.update(id, updateTicketDto);
  }
}
