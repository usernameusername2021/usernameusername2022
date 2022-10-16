import { Module } from '@nestjs/common';
import { LikeCounterService } from './like-counter.service';
import { LikeCounterGateway } from './like-counter.gateway';

@Module({
  providers: [LikeCounterGateway, LikeCounterService]
})
export class LikeCounterModule {}
