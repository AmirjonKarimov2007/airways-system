import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, MaxLength, IsUUID } from 'class-validator';

export class CreateAirportDto {
  @ApiProperty({ example: 'John F. Kennedy International Airport' })
  @IsString()
  @MaxLength(140)
  name!: string;

  @ApiProperty({ minLength: 3, maxLength: 10, example: 'JFK' })
  @IsString()
  @Length(3, 10)
  code!: string;

  @ApiProperty({ format: 'uuid', example: '1a2b3c4d-5e6f-7081-92ab-b3c4d5e6f708' })
  @IsUUID()
  cityId!: string;

  @ApiPropertyOptional({ minimum: -90, maximum: 90, example: 40.6413 })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  latitude?: number;

  @ApiPropertyOptional({ minimum: -180, maximum: 180, example: -73.7781 })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  longitude?: number;
}
