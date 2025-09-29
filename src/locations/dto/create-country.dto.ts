import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MaxLength } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ example: 'United States of America' })
  @IsString()
  @MaxLength(80)
  name!: string;

  @ApiProperty({ minLength: 2, maxLength: 3, example: 'USA' })
  @IsString()
  @Length(2, 3)
  code!: string;
}
