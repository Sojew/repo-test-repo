import { Test, TestingModule } from '@nestjs/testing';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';
import { HttpModule } from '@nestjs/axios';
describe('ConverterController', () => {
  let converterController: ConverterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ConverterController],
      providers: [ConverterService],
    }).compile();

    converterController = app.get<ConverterController>(ConverterController);
  });

  it('!= NaN ', async () => {
    const query = { from: 'bitcoin', to: 'openblox', amount: 10999999999999999999999999999 };
    const data = await converterController.convertCurrency(query);
    expect(data.result).not.toEqual('NaN');
  });
  describe('bitcoin/openblox', () => {
    it('!=Infinity ', async () => {
      const query = {
        from: 'bitcoin',
        to: 'openblox',
        amount: 10000000000000000000000000000000000000000000000000,
      };
      const data = await converterController.convertCurrency(query);
      expect(String(data.result)).not.toEqual('Infinity');
    });
  });
});
