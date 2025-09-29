import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'traveler123' })
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'traveler123@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SecurePass!8' })
  @MinLength(8)
  password!: string;

  @ApiProperty({ required: false, example: 'Amirjon Valiyev' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ required: false, example: '+998901234567' })
  @IsOptional()
  @IsString()
  phone?: string;
}
