import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateTicketDto } from './dto/create-ticket.dto';

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly tickets: TicketsService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateTicketDto) {
    return this.tickets.create(req.user.sub, dto.bookingId);
  }

  @Get('mine')
  mine(@Req() req: any, @Query('page') page = 1, @Query('limit') limit = 20) {
    return this.tickets.listMine(req.user.sub, Number(page), Number(limit));
  }
}
