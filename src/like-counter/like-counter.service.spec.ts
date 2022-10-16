import { Test, TestingModule } from '@nestjs/testing';
import { LikeCounterService } from './like-counter.service';

describe('LikeCounterService', () => {
  let service: LikeCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeCounterService],
    }).compile();

    service = module.get<LikeCounterService>(LikeCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
