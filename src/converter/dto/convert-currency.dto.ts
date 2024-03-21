import { IsString, IsNumber, IsOptional } from 'class-validator';
import { IConverterQuery } from '../interfaces/converter-query.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ConvertCurrencyDTO implements IConverterQuery {
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

  @Transform(({ value }) => parseFloat(value))
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    required: true,
    description: 'amount {query_param}, default=1',
  })
  amount: number = 1;
}
