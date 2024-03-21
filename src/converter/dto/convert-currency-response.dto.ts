import { IConverterResponse } from '../interfaces/converter-query.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ConvertCurrencyResponseDTO implements IConverterResponse {
  @ApiProperty({
    required: true,
    description: 'from which currency {query_param}',
  })
  from: string;

  @ApiProperty({
    required: true,
    description: 'to which currency {query_param}, default=tether',
    default: 'tether',
  })
  to: string;

  @ApiProperty({
    required: true,
    description: 'amount {query_param}, default=1',
    default: 1,
  })
  amount: number;

  @ApiProperty({
    required: true,
    description: 'convertation result',
    default: 1,
  })
  result: string;
}
