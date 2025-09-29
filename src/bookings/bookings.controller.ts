import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { AssignSeatDto } from './dto/assign-seat.dto';
import { ChangeSeatDto } from './dto/change-seat.dto';

@ApiTags('Bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private service: BookingsService) {}

  @Get('mine')
  my(@Req() req: any, @Query('page') page = 1, @Query('limit') limit = 20) {
    return this.service.myBookings(req.user.sub, Number(page), Number(limit));
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateBookingDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Post(':id/cancel')
  cancel(@Req() req: any, @Param('id') id: string, @Body() dto: CancelBookingDto) {
    return this.service.cancel(req.user.sub, id, dto.reason);
  }

  @Get(':flightId/seats')
  seatMap(@Param('flightId') flightId: string) {
    return this.service.seatMap(flightId);
  }

  @Post(':id/assign-seat')
  assignSeat(@Req() req: any, @Param('id') id: string, @Body() dto: AssignSeatDto) {
    return this.service.assignSeat(req.user.sub, id, dto);
  }

  @Post(':id/change-seat')
  changeSeat(@Req() req: any, @Param('id') id: string, @Body() dto: ChangeSeatDto) {
    return this.service.changeSeat(req.user.sub, id, dto);
  }
}
