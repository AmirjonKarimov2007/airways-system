import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateReviewDto) {
    return this.service.post(req.user.sub, dto.flightId, dto.rating, dto.comment);
  }

  @Get()
  listAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.service.listAll(Number(page), Number(limit));
  }

  @Get('flight/:id')
  listByFlight(@Param('id') id: string, @Query('page') page = 1, @Query('limit') limit = 20) {
    return this.service.listForFlight(id, Number(page), Number(limit));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.service.remove(id, req.user.sub, true);
  }
}
