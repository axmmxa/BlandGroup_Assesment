import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const appServiceMock = {
      getStart: jest.fn().mockReturnValue('BlandGroup Q4 by Alexander Much'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: appServiceMock }],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should return "BlandGroup Q4 by Alexander Much"', () => {
    expect(appController.getStart()).toBe('BlandGroup Q4 by Alexander Much');
    expect(appService.getStart).toHaveBeenCalled(); // Ensure the service method is called
  });
});
