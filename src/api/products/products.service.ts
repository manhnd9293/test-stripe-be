import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductCreateDto } from './dtos/product-create.dto';
import { PaymentsService } from '../payments/payments.service';
// import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly paymentsService: PaymentsService,
  ) {

  }
  getAll() {
    return this.productRepository.find({});
  }

  async create(data: ProductCreateDto) {
    const productEntity = this.productRepository.create(data);
    let saved = await this.productRepository.save(productEntity);
    try {
      const paymentProd = await this.paymentsService.createPaymentProduct(saved);
    } catch (e) {
      console.log("Fail to create product in payment gateway");
    }

    return saved;

  }
}
