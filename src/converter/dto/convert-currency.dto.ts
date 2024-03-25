import { IsString, IsNumber, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { IConverterQuery } from '../interfaces/converter-query.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ConvertCurrencyDTO implements IConverterQuery {
  @IsString()
  @IsNotEmpty()
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
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @ApiProperty({
    required: true,
    description: 'amount {query_param}, default=1',
  })
  amount: number = 1;
}
