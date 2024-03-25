import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConverterModule } from '../src/converter/converter.module';

describe('ConverterController (E2E)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ConverterModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/currency/convert (GET)', () => {
    return request(app.getHttpServer())
      .get('/currency/convert')
      .query({ from: 'bitcoin', to: 'ethereum', amount: 1 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('amount');
        expect(res.body).toHaveProperty('from');
        expect(res.body).toHaveProperty('to');
        expect(res.body).toHaveProperty('result');
      });
  });

  it('/currency/convert (GET) - missing required parameter', () => {
    return request(app.getHttpServer())
      .get('/currency/convert')
      .query({ to: 'ethereum', amount: 1 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(
          expect.arrayContaining(['from should not be empty', 'from must be a string']),
        );
      });
  });
});
