import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsUUID } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({ example: 'New York' })
  @IsString()
  @MaxLength(120)
  name!: string;

  @ApiProperty({ format: 'uuid', example: '9be1a8d4-6c2e-4d1f-9a4a-1f7f7f90a6c3' })
  @IsUUID()
  countryId!: string;
}
