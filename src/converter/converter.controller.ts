import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConvertCurrencyResponseDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('currency')
@Controller('currency')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Get('convert')
  @ApiResponse({
    status: 200,
    description: 'Currency conversion result',
    type: ConvertCurrencyResponseDTO,
  })
  async convertCurrency(
    @Query('from') from: string,
    @Query('to') to: string = 'tether',
    @Query('amount') amount: number = 1,
  ): Promise<ConvertCurrencyResponseDTO> {
    if (!from) {
      throw new BadRequestException('The "from" parameter is required.');
    }

    // try {
    const result = await this.converterService.convertCurrency(from, to, amount);
    return result;
    // } catch (error) {
    //   throw new BadRequestException('An error occurred during the conversion.');
    // }
  }
}
