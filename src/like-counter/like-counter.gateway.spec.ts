import { Test, TestingModule } from '@nestjs/testing';
import { LikeCounterGateway } from './like-counter.gateway';
import { LikeCounterService } from './like-counter.service';

describe('LikeCounterGateway', () => {
  let gateway: LikeCounterGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeCounterGateway, LikeCounterService],
    }).compile();

    gateway = module.get<LikeCounterGateway>(LikeCounterGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
