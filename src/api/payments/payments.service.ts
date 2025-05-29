import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { ProductEntity } from '../products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreateDto } from '../products/dtos/product-create.dto';
import { CreateCheckoutDto } from './dtos/create-checkout.dto';

@Injectable()
export class PaymentsService {

  private readonly stripe: Stripe;

  constructor(
    @InjectRepository(ProductEntity) private readonly productEntityRepository: Repository<ProductEntity>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }

  createCheckout(data: CreateCheckoutDto) {

    const paymentIntents = this.stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      }

    });
  }

  async createPaymentProduct(data: Pick<ProductEntity, 'name' | 'price' | 'id'>) {
    const paymentProduct = await this.stripe.products.create({
      name: data.name,
      type: 'good',
      id: data.id
    });

    await this.stripe.prices.create({
      product: paymentProduct.id,
      currency: 'usd',
      unit_amount: data.price,
    })
    return paymentProduct;
  }
}
