import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../common/constants';

export class CreateUserDto {
  @ApiProperty() @IsString() username!: string;
  @ApiProperty() @IsEmail() email!: string;
  @ApiProperty() @MinLength(8) password!: string;
  @ApiProperty({ enum: UserRole, required: false }) @IsOptional() @IsEnum(UserRole) role?: UserRole;
  @ApiProperty({ required: false }) @IsOptional() fullName?: string;
  @ApiProperty({ required: false }) @IsOptional() phone?: string;
}
