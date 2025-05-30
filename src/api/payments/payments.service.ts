import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { ProductEntity } from '../products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCheckoutDto } from './dtos/create-checkout.dto';
import { CreateCheckoutSessionResponse } from './dtos/create-checkout-session-response';
import { ProductPriceEntity } from './entities/product-price.entity';

@Injectable()
export class PaymentsService {

  private readonly stripe: Stripe;

  constructor(
    @InjectRepository(ProductEntity) private readonly productEntityRepository: Repository<ProductEntity>,
    @InjectRepository(ProductPriceEntity) private readonly productPriceRepository: Repository<ProductPriceEntity>,

  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }

  async createCheckoutSession(data: CreateCheckoutDto) : Promise<CreateCheckoutSessionResponse> {
    const {productId} = data;
    const product = await this.productEntityRepository.findOne({
      where: {
        id: productId,
        prices: {
          active: true
        }
      },
      relations: {
        prices: true
      }
    });

    if (!product || product.prices.length === 0) {
      throw new BadRequestException('Invalid checkout product');
    }
    const priceId = product.prices[0].stripePriceId;
    const session = await this.stripe.checkout.sessions.create({
      ui_mode: 'custom',
      line_items: [
        {
          price: priceId,
          quantity: 10
        }
      ],
      mode: 'payment',
    });

    return {
      clientSecret: session.client_secret
    };
  }

  async createPaymentProduct(data: Pick<ProductEntity, 'name' | 'price' | 'id'>) {
    const paymentProduct = await this.stripe.products.create({
      name: data.name,
      type: 'good',
      id: data.id
    });

    const price = await this.stripe.prices.create({
      product: paymentProduct.id,
      currency: 'usd',
      unit_amount: data.price,
    });

    const productPriceEntity = this.productPriceRepository.create({
      productId: data.id,
      stripePriceId: price.id,
      active: true
    });
    await this.productPriceRepository.save(productPriceEntity);

    return paymentProduct;
  }
}
