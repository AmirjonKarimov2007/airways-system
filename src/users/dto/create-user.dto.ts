import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../common/constants';

export class CreateUserDto {
  @ApiProperty({ example: 'supervisor1' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'supervisor1@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPass!8' })
  @MinLength(8)
  password!: string;

  @ApiProperty({ enum: UserRole, required: false, example: UserRole.ADMIN })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({ required: false, example: 'Aziza Rasulova' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ required: false, example: '+998935551010' })
  @IsOptional()
  @IsString()
  phone?: string;
}
