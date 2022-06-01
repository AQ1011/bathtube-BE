import { Test, TestingModule } from '@nestjs/testing';
import { VcGateway } from './vc.gateway';

describe('VcGateway', () => {
  let gateway: VcGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VcGateway],
    }).compile();

    gateway = module.get<VcGateway>(VcGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
