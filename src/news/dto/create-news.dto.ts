import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'BlueSky launches new Tashkent to London route' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Starting October 12, passengers can enjoy daily flights between Tashkent and London with our upgraded Airbus fleet.' })
  @IsString()
  content!: string;

  @ApiProperty({ required: false, example: 'https://cdn.airways.com/news/tashkent-london.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
