import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { LoyaltyService } from './loyalty.service';

@ApiTags('Loyalty')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('loyalty')
export class LoyaltyController {
  constructor(private service: LoyaltyService) {}

  @Get('me')
  me(@Req() req: any) {
    return this.service.get(req.user.sub);
  }

  @Post('redeem')
  redeem(@Req() req: any, @Body('points') points: number) {
    return this.service.redeemPoints(req.user.sub, points);
  }
}
