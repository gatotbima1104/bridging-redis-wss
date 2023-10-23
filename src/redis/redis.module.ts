import { Module } from '@nestjs/common';
import { RedisGateway } from './redis.gateway';

@Module({
  providers: [RedisGateway],
})
export class RedisModule {}
