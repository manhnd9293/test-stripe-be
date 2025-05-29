import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateCheckoutDto } from './dtos/create-checkout.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {
  }

  @Post('/create-checkout-session')
  createPaymentIntent(@Body() data: CreateCheckoutDto) {
    this.paymentsService.createCheckout(data);
  }
}
