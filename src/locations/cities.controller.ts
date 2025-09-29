import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly service: LocationsService) {}

  @Get()
  async list(
    @Query('page') page = 1,
    @Query('limit') limit = 50,
    @Query('countryId') countryId?: string,
  ) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const [items, total] = await this.service.listCities(pageNum, limitNum, countryId);
    return { total, page: pageNum, limit: limitNum, items };
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.getCity(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post()
  create(@Body() dto: CreateCityDto) {
    return this.service.createCity(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCityDto) {
    return this.service.updateCity(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.removeCity(id);
  }
}
