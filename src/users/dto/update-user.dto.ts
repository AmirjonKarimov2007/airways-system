import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ maxLength: 120, example: 'Amirjon Valiyev' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  fullName?: string;

  @ApiPropertyOptional({ maxLength: 15, example: '+998901234567' })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;
}
