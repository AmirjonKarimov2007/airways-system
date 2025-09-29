import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'amirjonkarimoff@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Karimoff2007' })
  @IsString()
  password!: string;
}
