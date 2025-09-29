import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'traveler123@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SecurePass!8' })
  @IsString()
  password!: string;
}
