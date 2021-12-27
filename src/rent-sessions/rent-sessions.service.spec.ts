import { Test, TestingModule } from '@nestjs/testing';
import { RentSessionsService } from './rent-sessions.service';

describe('RentSessionsService', () => {
  let service: RentSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentSessionsService],
    }).compile();

    service = module.get<RentSessionsService>(RentSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
