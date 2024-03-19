import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConvertCurrencyDTO {
  @IsString()
  @ApiProperty({
    required: true,
    description: 'from which currency {query_param}',
  })
  from: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'to which currency {query_param}, default=tether',
  })
  to: string = 'tether';

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    required: true,
    description: 'amount {query_param}, default=1',
  })
  amount: number = 1;

  result?: string;
}
