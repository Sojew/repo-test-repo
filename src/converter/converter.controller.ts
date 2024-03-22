import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConvertCurrencyResponseDTO, ConvertCurrencyDTO } from './dto';
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
  async convertCurrency(@Query() query: ConvertCurrencyDTO): Promise<ConvertCurrencyResponseDTO> {
    if (!query.from) {
      throw new BadRequestException('Missing required from param');
    }

    const result = await this.converterService.convertCurrency(query.from, query.to, query.amount);
    return result;
  }
}
