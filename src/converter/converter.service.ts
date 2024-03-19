import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Big } from 'big.js';
import { ICurrencyData } from './interfaces';

@Injectable()
export class ConverterService {
  async convertCurrency(from: string, to: string, amount: number): Promise<any> {
    try {
      const prices: ICurrencyData[] = await this.fetchPrices();
      const fromPriceData = prices.find((price) => price.key === from);
      const toPriceData = prices.find((price) => price.key === to);
      console.log(toPriceData, fromPriceData);
      if (!fromPriceData || !toPriceData) {
        throw new HttpException('Invalid currency', HttpStatus.BAD_REQUEST);
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
      return value.toFixed(20); // > 0.000000000000000001 ETH
    } catch (error) {
      throw new HttpException('Conversion error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchPrices(): Promise<ICurrencyData[]> {
    const url = 'https://tstapi.cryptorank.io/v0/coins/prices/';
    const response = await axios.get(url);
    return response.data.data;
  }
}
