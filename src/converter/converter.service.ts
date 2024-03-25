import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Big } from 'big.js';
import { ICurrencyData } from './interfaces';
import { catchError, map, firstValueFrom } from 'rxjs';

@Injectable()
export class ConverterService {
  constructor(private readonly httpService: HttpService) {}

  async convertCurrency(from: string, to: string, amount: number): Promise<any> {
    try {
      const prices: ICurrencyData[] = await this.fetchPrices();
      const fromPriceData = prices.find((price) => price.key === from);
      const toPriceData = prices.find((price) => price.key === to);

      if (!fromPriceData) {
        throw new HttpException('Invalid from currency', HttpStatus.BAD_REQUEST);
      }
      if (!toPriceData) {
        throw new HttpException('Invalid to currency', HttpStatus.BAD_REQUEST);
      }
      if (!amount) {
        throw new HttpException('Invalid amount', HttpStatus.BAD_REQUEST);
      }
      const result = this.convert(fromPriceData.price, toPriceData.price, amount);

      return {
        amount,
        from: fromPriceData.key,
        to: toPriceData.key,
        result,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  convert(fromPrice: number, toPrice: number, amount: number): string {
    try {
      const fromPriceBig = new Big(fromPrice);
      const amountBig = new Big(amount);
      const toPriceBig = new Big(toPrice);

      const value = fromPriceBig.times(amountBig).div(toPriceBig);
      return value.toFixed(20);
    } catch (error) {
      throw new HttpException('Conversion error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchPrices(): Promise<ICurrencyData[]> {
    const url = 'https://tstapi.cryptorank.io/v0/coins/prices/';
    return firstValueFrom(
      this.httpService.get(url).pipe(
        map((response: AxiosResponse) => response.data.data),
        catchError((error: any) => {
          console.error('An error fetching currency data from server!', error);
          throw new HttpException(
            'An error fetching currency data from server!',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );
  }
}
