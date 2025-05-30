import { IsString } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  productId: string;
}