import { IsNumber, IsString, Min } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}