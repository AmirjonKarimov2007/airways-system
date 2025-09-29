import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoyaltyTransaction } from './entities/loyalty-transaction.entity';
import { Repository, EntityManager } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoyaltyTier } from '../common/constants';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectRepository(LoyaltyTransaction)
    private repo: Repository<LoyaltyTransaction>,
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async earnPoints(userId: string, points: number, reason: string, manager?: EntityManager) {
    const em = manager ?? this.repo.manager;
    await em.save(LoyaltyTransaction, { user: { id: userId } as any, points, type: 'EARN', reason });
    const user = await em.findOneByOrFail(User, { id: userId });
    user.loyaltyPoints += points;
    user.tier = this.computeTier(user.loyaltyPoints);
    await em.save(User, user);
  }

  async redeemPoints(userId: string, points: number, manager?: EntityManager, reason = 'Redeem') {
    const em = manager ?? this.repo.manager;
    const user = await em.findOneByOrFail(User, { id: userId });
    user.loyaltyPoints = Math.max(0, user.loyaltyPoints - points);
    user.tier = this.computeTier(user.loyaltyPoints);
    await em.save(User, user);
    await em.save(LoyaltyTransaction, { user: { id: userId } as any, points: -points, type: 'REDEEM', reason });
  }

  async get(userId: string) {
    const user = await this.users.findOneByOrFail({ id: userId });
    const txns = await this.repo.find({ where: { user: { id: userId } as any }, order: { createdAt: 'DESC' }, take: 50 });
    return { points: user.loyaltyPoints, tier: user.tier, history: txns };
  }

  computeTier(points: number): LoyaltyTier {
    if (points >= 2000) return LoyaltyTier.GOLD;
    if (points >= 1000) return LoyaltyTier.SILVER;
    return LoyaltyTier.BRONZE;
  }
}
