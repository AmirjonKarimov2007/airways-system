import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../common/constants';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findById(id: string) {
    const u = await this.repo.findOne({ where: { id } });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async create(dto: CreateUserDto) {
    const password = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password });
    return this.repo.save(user);
  }

  async updateProfile(id: string, dto: UpdateUserDto) {
    const user = await this.findById(id);
    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async adjustBalance(id: string, amount: number) {
    const user = await this.findById(id);
    const current = Number(user.balance ?? 0);
    const next = Math.round((current + amount) * 100) / 100;
    if (next < 0) {
      throw new BadRequestException('Balance cannot be negative');
    }
    user.balance = next;
    return this.repo.save(user);
  }

  async listAdmins() {
    return this.repo.find({
      where: [{ role: UserRole.ADMIN }, { role: UserRole.SUPER_ADMIN }],
    });
  }

  async promoteToAdmin(id: string) {
    const user = await this.findById(id);
    user.role = UserRole.ADMIN;
    return this.repo.save(user);
  }

  async demoteToUser(id: string) {
    const user = await this.findById(id);
    user.role = UserRole.USER;
    return this.repo.save(user);
  }

  async delete(id: string) {
    await this.repo.softDelete(id);
    return { ok: true };
  }
}
