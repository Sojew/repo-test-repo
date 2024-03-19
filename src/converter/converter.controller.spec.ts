import { Test, TestingModule } from '@nestjs/testing';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';

describe('ConverterController', () => {
  let converterController: ConverterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConverterController],
      providers: [ConverterService],
    }).compile();

    converterController = app.get<ConverterController>(ConverterController);
  });

  it('!= NaN ', async () => {
    const data = await converterController.convertCurrency(
      'bitcoin',
      'openblox',
      10999999999999999999999999999,
    );
    expect(data.result).not.toEqual('NaN');
  });
  describe('bitcoin/openblox', () => {
    it('!=Infinity ', async () => {
      const data = await converterController.convertCurrency(
        'bitcoin',
        'openblox',
        10000000000000000000000000000000000000000000000000,
      );
      expect(String(data.result)).not.toEqual('Infinity');
    });
  });
});
