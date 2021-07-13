import { CACHE_MANAGER, Inject, Injectable, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { UserProfile } from './model/user-profile.model';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  async getUserProfile(userId: number): Promise<UserProfile> {
    var value = await this.cacheManager.get<UserProfile>(userId.toString());
    if (value) {
      return {
        data: value,
        LoadsFrom: 'redisCache',
      }.data;
    }
  }

  async saveUserProfile(
    userId: number,
    userProfile: UserProfile,
  ): Promise<void> {
    await this.cacheManager.set<UserProfile>(userId.toString(), userProfile, {
      ttl: this.configService.get('REDIS_TTL'),
    });
  }
}
