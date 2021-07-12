import { CACHE_MANAGER, Inject, Injectable, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { Profile } from 'src/repositories/entities/profile.entity';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  async getUserProfile(userId: number): Promise<Profile> {
    var value = await this.cacheManager.get<Profile>(userId.toString());
    if (value) {
      return {
        data: value,
        LoadsFrom: 'redis cache',
      }.data;
    }
  }

  async saveUserProfile(userId: number, profile: Profile): Promise<void> {
    await this.cacheManager.set<Profile>(userId.toString(), profile, {
      ttl: this.configService.get('REDIS_TTL'),
    });
  }
}
