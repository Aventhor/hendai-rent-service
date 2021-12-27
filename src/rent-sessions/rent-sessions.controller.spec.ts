import { Test, TestingModule } from '@nestjs/testing';
import { RentSessionsController } from './rent-sessions.controller';

describe('RentSessionsController', () => {
  let controller: RentSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentSessionsController],
    }).compile();

    controller = module.get<RentSessionsController>(RentSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
