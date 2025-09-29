import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AdjustBalanceDto {
  @ApiProperty({ description: 'Positive number to add, negative to subtract', example: 150.5 })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount!: number;

  @ApiProperty({ required: false, example: 'Manual adjustment for loyalty bonus' })
  @IsOptional()
  @IsString()
  reason?: string;
}
